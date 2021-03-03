import { Campus, Employee } from '../../sequelize.js'
import asyncHandler from '../../middlewares/asyncHandler.js'

export const list = asyncHandler(async (req, res, next) => {
  const pagenum = parseInt(req.query.pagenum ?? 1)
  const pagesize = parseInt(req.query.pagesize ?? 10)
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  const data = await Campus.findAndCountAll({
    order: [[ 'id', 'DESC' ]],
    where: query,
    // 跳过几个
    offset: (pagenum - 1) * pagesize,
    // 获取几个
    limit: pagesize
  })

  for (let i = 0; i < data.rows.length; i++) {
    const item = data.rows[i]
    const employee = await Employee.findByPk(item.campusMasterId, {
      attributes: ['realname']
    })
    item.setDataValue('masterName', employee?.realname)
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
  const data = await Campus.create(req.body)
  res.status(201).json({
    code: 201,
    message: '添加成功',
    data: data
  })
})

export const update = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Campus.update(req.body, {
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
  const data = await Campus.destroy({
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
  const campus = await Campus.findByPk(id, {
    attributes: ['id', 'campusMasterId', 'campusName', 'desc']
  })

  const employee = await Employee.findByPk(campus.campusMasterId, {
    attributes: ['id', 'username', 'realname']
  })

  campus.setDataValue('campusMaster', employee.realname)
  // campus.dataValues.campusMaster = employee.realname

  res.status(200).json({
    code: 200,
    message: '获取校区详情成功',
    data: campus
  })
})