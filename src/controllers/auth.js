import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Employee } from '../sequelize.js'
import asyncHandler from '../middlewares/asyncHandler.js'


// 登录
export const login = asyncHandler(async function login (req, res, next) {
  const { username, password } = req.body
  const employee = await Employee.findOne({
    where: {
      username
    }
  })

  if (!employee) {
    return next({
      code: 400,
      message: '用户名不存在'
    })
  }

  const passwordMatch = await bcrypt.compare(password, employee.password)
  if (!passwordMatch) {
    return next({
      code: 400,
      message: '密码不正确'
    })
  }

  const payload = {
    id: employee.id,
    username: employee.username,
    realname: employee.realname,
    avatar: employee.avatar,
    tokenCreated: Date.now()
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })

  res.status(200).json({
    code: 200,
    message: '登录成功',
    data: token
  })
})

// 退出 TODO：token的处理
export const signout = asyncHandler(async (req, res) => {
  res.status(200).json({
    code: 200,
    message: '退出成功',
    data: {}
  })
})

// 获取当前登录员工的个人信息
export const me = asyncHandler(async (req, res) => {
  // 查询部门
  // 查询角色
  res.status(200).json({
    code: 200,
    message: '获取信息成功',
    data: req.employee
  })
})