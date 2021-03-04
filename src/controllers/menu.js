import { Menu, Role } from '../sequelize.js'
import asyncHandler from '../middlewares/asyncHandler.js'

// 根据用户的角色获取菜单树
export const getAuthMenuTree = asyncHandler(async (req, res) => {
  let tree = []
  
  const role = await Role.findOne({
    attributes: ['menuIds'],
    where: {
      id: req.employee.RoleId
    }
  })
  const menus = await Menu.findAll({
    where: {
      id: role.menuIds ? JSON.parse(role.menuIds) : []
      // id: {
      //   [Op.in]: role.menuIds
      // }
    },
    order: [[ 'order', 'ASC' ]]
  })

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

  tree = getTreeData(menus)

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
