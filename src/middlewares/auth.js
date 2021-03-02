import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import { Employee } from '../sequelize.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.token
  if (!token) {
    return next({
      code: 401,
      message: '请先登录'
    })
  }
  token = token.replace('Bearer', '').trim()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const employee = await Employee.findOne({
      where: {
        id: decoded.id
      }
    })
    // 把当前员工信息存储到req中
    req.employee = employee
    next()
  } catch (err) {
    next({
      message: '您的Token信息有误，请重新登录',
      code: 401
    })
  }
})
