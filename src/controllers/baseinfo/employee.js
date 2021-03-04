import bcrypt from 'bcryptjs'
import { Employee, Depart, Role, Campus } from '../../sequelize.js'
import asyncHandler from '../../middlewares/asyncHandler.js'
import { isDef } from '../../utils/index.js'

import pkg from 'sequelize'
const Op = pkg.Op

export const list = asyncHandler(async (req, res, next) => {
  const pagenum = parseInt(req.query.pagenum ?? 1)
  const pagesize = parseInt(req.query.pagesize ?? 10)
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  
  const myQuery = {}
  // 处理查询条件
  if (isDef(query.employeeName)) {
    myQuery.realname = {
      [Op.startsWith]: query.realname
    }
  }

  if (query.campusId && query.campusId !== -1) {
    myQuery.CampusId = query.campusId
  }

  if (query.departId && query.departId !== -1) {
    myQuery.DepartId = query.departId
  }

  if (query.roleId && query.roleId !== -1) {
    myQuery.RoleId = query.roleId
  }
  
  const data = await Employee.findAndCountAll({
    order: [[ 'id', 'DESC' ]],
    where: myQuery,
    include: [
      { model: Depart },
      { model: Role },
      { model: Campus }
    ],
    // 排除密码数据
    attributes: { exclude: ['password'] },
    // 跳过几个
    offset: (pagenum - 1) * pagesize,
    // 获取几个
    limit: pagesize
  })

  res.status(200).json({
    code: 200,
    message: '获取列表数据成功',
    data: {
      pagenum: pagenum,
      pagesize: pagesize,
      total: data.count,
      items: data.rows
    }
  })
})

export const add = asyncHandler(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10)
  if (req.body?.mobile.length === 11) {
    req.body.password = req.body.mobile.substr(5, 6)
  } else {
    req.body.password = '123456'
  }
  req.body.password = await bcrypt.hash(req.body.password, salt)
  req.body.CampusId = req.body.campusId
  req.body.DepartId = req.body.departId
  req.body.RoleId = req.body.roleId
  const data = await Employee.create(req.body)
  res.status(201).json({
    code: 201,
    message: '添加成功',
    data: data
  })
})

export const update = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  req.body.CampusId = req.body.campusId
  req.body.DepartId = req.body.departId
  req.body.RoleId = req.body.roleId
  const data = await Employee.update(req.body, {
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
  const data = await Employee.destroy({
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
  const data = await Employee.findByPk(id, {
    include: [
      { model: Depart },
      { model: Role }
    ],
    // 排除密码数据
    attributes: { exclude: ['password'] }
  })

  if (!data) {
    return res.status(404).json({
      code: 404,
      message: '没有获取到数据',
      data: data
    })
  }

  res.status(200).json({
    code: 200,
    message: '获取数据成功',
    data: data
  })
})