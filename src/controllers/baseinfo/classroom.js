import \{ Classroom } from '../sequelize.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const list = asyncHandler(async (req, res, next) => {
  const pagenum = parseInt(req.query.pagenum ?? 1)
  const pagesize = parseInt(req.query.pagesize ?? 10)
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  
  // 处理查询条件
  if (query.classroomName) {
    query.classroomName = {
      [Op.startsWith]: query.classroomName
    }
  }
  
  const data = await Role.findAndCountAll({
    order: [[ 'id', 'DESC' ]],
    where: query,
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
  const data = await Classroom.create(req.body)
  res.status(201).json({
    code: 201,
    message: '添加成功',
    data: data
  })
})

export const update = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Classroom.update(req.body, {
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
  const data = await Classroom.destroy({
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
  res.status(200).json({
    code: code,
    message: message,
    data: data
  })
})

export const detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const data = await Classroom.findByPk(id)

  res.status(200).json({
    code: 200,
    message: '获取数据成功',
    data: data
  })
})