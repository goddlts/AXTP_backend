import { Menu, Role } from '../sequelize.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import { isDef } from '../utils/index.js'

import pkg from 'sequelize'
const Op = pkg.Op

// 根据用户的角色获取菜单树
export const getAuthMenuTree = asyncHandler(async (req, res) => {
  let tree = []
  
  const role = await Role.findOne({
    attributes: ['menuIds'],
    where: {
      id: req.employee.RoleId
    }
  })
  let menus = await Menu.findAll({
    where: {
      id: role.menuIds ? JSON.parse(role.menuIds) : []
      // id: {
      //   [Op.in]: role.menuIds
      // }
    },
    order: [[ 'order', 'ASC' ]]
  })

  // 找到当前菜单项的父项id
  let menuParentIds = menus.map(m => {
    return m.getDataValue('parentId')
  })
  // 数组去重
  menuParentIds = Array.from(new Set(menuParentIds))
  const parentMenus = await Menu.findAll({
    where: {
      id: menuParentIds
    }
  })

  menus = [...parentMenus, ...menus]

  tree = getTreeData(menus)

  res.status(200).json({
    code: 200,
    message: '获取信息成功',
    data: tree
  })
})

// 所有的菜单树
export const menuTree = asyncHandler(async (req, res) => {
  let tree = []
  const menus = await Menu.findAll({
    order: [[ 'order', 'ASC' ]]
  })

  tree = getTreeDataNoHidden(menus)

  res.status(200).json({
    code: 200,
    message: '获取信息成功',
    data: tree
  })
})

// 所有的菜单树
export const allMenuTree = asyncHandler(async (req, res) => {
  let tree = []
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  // 处理查询条件
  if (isDef(query.menuName)) {
    query.menuName = {
      [Op.substring]: query.menuName
    }
  }

  const menus = await Menu.findAll({
    where: query,
    order: [[ 'order', 'ASC' ]]
  })

  tree = getTreeData(menus)

  res.status(200).json({
    code: 200,
    message: '获取信息成功',
    data: tree
  })
})

// 提供给下拉框使用的数据
export const menuSelect = asyncHandler(async (req, res) => {
  let tree = []
  const level = req.query.level
  let query = {}
  if (level === '1') {
    query.parentId = 0
  }
  const menus = await Menu.findAll({
    where: query,
    order: [[ 'order', 'ASC' ]]
  })

  tree = getTreeDataNoHidden(menus)

  res.status(200).json({
    code: 200,
    message: '获取信息成功',
    data: tree
  })
})

// 增删改
export const add = asyncHandler(async (req, res, next) => {
  const data = await Menu.create(req.body)
  res.status(201).json({
    code: 201,
    message: '添加成功',
    data: data
  })
})

export const update = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Menu.update(req.body, {
    where: {
      id: id
    }
  })
  res.status(200).json({
    code: 200,
    message: '更新成功',
    data: data
  })
})

export const del = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Menu.destroy({
    where: {
      id
    }
  })

  let code = 200
  let message = '删除成功'
  if (data === 0) {
    code = 404
    message = '要删除的数据不存在'
  }
  res.status(code).json({
    code: code,
    message: message,
    data: data
  })
})

export const detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Menu.findByPk(id)
  if (!data) {
    return res.status(404).json({
      code: 404,
      message: '没有获取到数据',
      data: data
    })
  }
  res.status(200).json({
    code: 200,
    message: '获取校区详情成功',
    data: data
  })
})

/**
 * 获取树形数据
 * @param { Array } menus 
 */
function getTreeData (menus) {
  const tree = []
  menus.forEach(menu => {
    if (menu.parentId === 0) {
      tree.push(menu)
    }
    menu.setDataValue('children', [])
    menu.setDataValue('meta', {
      title: menu.menuName,
      icon: menu.icon
    })
  })

  tree.forEach(menu => {
    menus.forEach(subMenu => {
      if (menu.id === subMenu.parentId) {
        menu.dataValues.children.push(subMenu)
      }
    })
  })
  return tree
}

/**
 * 获取树形数据 排除 hidden
 * @param { Array } menus 
 */
function getTreeDataNoHidden (menus) {
  const tree = []
  menus.forEach(menu => {
    if (menu.parentId === 0 && !menu.hidden) {
      tree.push(menu)
    }
    menu.setDataValue('children', [])
    menu.setDataValue('meta', {
      title: menu.menuName,
      icon: menu.icon
    })
  })

  tree.forEach(menu => {
    menus.forEach(subMenu => {
      if (menu.id === subMenu.parentId && !subMenu.hidden) {
        menu.dataValues.children.push(subMenu)
      }
    })
  })
  return tree
}
