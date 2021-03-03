import { Depart, Employee, Campus } from '../../sequelize.js'
import asyncHandler from '../../middlewares/asyncHandler.js'
import pkg from 'sequelize'
const Op = pkg.Op

export const list = asyncHandler(async (req, res, next) => {
  const pagenum = parseInt(req.query.pagenum ?? 1)
  const pagesize = parseInt(req.query.pagesize ?? 10)
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  
  // 处理查询条件
  if (query.departName) {
    query.departName = {
      [Op.startsWith]: query.departName
    }
  }

  const data = await Depart.findAndCountAll({
    order: [[ 'id', 'DESC' ]],
    where: query,
    include: [
      { model: Campus }
    ],
    // 跳过几个
    offset: (pagenum - 1) * pagesize,
    // 获取几个
    limit: pagesize
  })

  for (let i = 0; i < data.rows.length; i++) {
    const item = data.rows[i]
    const employee = await Employee.findByPk(item.departMasterId, {
      attributes: ['realname']
    })
    item.setDataValue('departMaster', employee?.realname)
  }

  res.status(200).json({
    code: 200,
    message: '获取校区列表成功',
    data: {
      pagenum: pagenum,
      pagesize: pagesize,
      total: data.count,
      items: data.rows
    }
  })
})

export const add = asyncHandler(async (req, res, next) => {
  const data = await Depart.create(req.body)
  res.status(201).json({
    code: 201,
    message: '添加成功',
    data: data
  })
})

export const update = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Depart.update(req.body, {
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
  const data = await Depart.destroy({
    where: {
      id
    }
  })
  res.status(200).json({
    code: 200,
    message: '删除成功',
    data: data
  })
})

export const detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Depart.findByPk(id)

  const employee = await Employee.findByPk(data.departMasterId, {
    attributes: ['realname']
  })

  data.setDataValue('departMaster', employee?.realname)

  res.status(200).json({
    code: 200,
    message: '获取部门详情成功',
    data: data
  })
})