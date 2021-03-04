import { Book, Employee, Subject } from '../../sequelize.js'
import asyncHandler from '../../middlewares/asyncHandler.js'
import { isDef } from '../../utils/index.js'

import pkg from 'sequelize'
const Op = pkg.Op

export const list = asyncHandler(async (req, res, next) => {
  const pagenum = parseInt(req.query.pagenum ?? 1)
  const pagesize = parseInt(req.query.pagesize ?? 10)
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  
  // 处理查询条件
  if (isDef(query.bookName)) {
    query.bookName = {
      [Op.startsWith]: query.bookName
    }
  }
  
  const data = await Book.findAndCountAll({
    order: [[ 'id', 'DESC' ]],
    where: query,
    include: [
      { model: Subject }
    ],
    // 跳过几个
    offset: (pagenum - 1) * pagesize,
    // 获取几个
    limit: pagesize
  })

  for (let i = 0; i < data.rows.length; i++) {
    const item = data.rows[i]
    const employee = await Employee.findByPk(item.EmployeeId, {
      attributes: ['realname']
    })
    item.setDataValue('masterName', employee?.realname)
  }

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
  const data = await Book.create(req.body)
  res.status(201).json({
    code: 201,
    message: '添加成功',
    data: data
  })
})

export const update = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Book.update(req.body, {
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
  const data = await Book.destroy({
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
  const data = await Book.findByPk(id, {
    include: [
      { model: Subject }
    ]
  })
  if (!data) {
    return res.status(404).json({
      code: 404,
      message: '没有获取到数据',
      data: data
    })
  }
  const employee = await Employee.findByPk(data?.EmployeeId, {
    attributes: ['realname']
  })
  data?.setDataValue('masterName', employee.realname)

  res.status(200).json({
    code: 200,
    message: '获取数据成功',
    data: data
  })
})