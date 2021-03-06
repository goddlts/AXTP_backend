import { Campus, Employee, Depart, Class, Classroom } from '../../sequelize.js'
import asyncHandler from '../../middlewares/asyncHandler.js'
import { isDef } from '../../utils/index.js'

import pkg from 'sequelize'
const Op = pkg.Op

export const list = asyncHandler(async (req, res, next) => {
  const pagenum = parseInt(req.query.pagenum ?? 1)
  const pagesize = parseInt(req.query.pagesize ?? 10)
  const query = req.query.query ? JSON.parse(req.query.query) : ''
  
  // 处理查询条件
  if (isDef(query.campusName)) {
    query.campusName = {
      [Op.startsWith]: query.campusName
    }
  }
  
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

  // 删除校区之前检查该校区下时候有部门、班级等
  const res1 = await Depart.findAndCountAll({
    where: {
      CampusId: id
    }
  })
  if (res1.count > 0) {
    return res.status(401).json({
      code: 401,
      message: '该校区下有部门，请先删除部门'
    })
  }

  const res2 = await Class.findAndCountAll({
    where: {
      CampusId: id
    }
  })
  if (res2.count > 0) {
    return res.status(401).json({
      code: 401,
      message: '该校区下有班级，请先删除班级'
    })
  }

  const res3 = await Classroom.findAndCountAll({
    where: {
      CampusId: id
    }
  })
  if (res3.count > 0) {
    return res.status(401).json({
      code: 401,
      message: '该校区下有教室，请先删除教室'
    })
  }

  const data = await Campus.destroy({
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
  const campus = await Campus.findByPk(id, {
    attributes: ['id', 'campusMasterId', 'campusName', 'desc']
  })

  if (!campus) {
    return res.status(404).json({
      code: 404,
      message: '没有获取到数据',
      data: campus
    })
  }

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