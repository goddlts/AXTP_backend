import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import { Employee, Role } from '../sequelize.js'

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
    if (employee.status === '离职') {
      return next({
        code: 401,
        message: '账号已停用'
      })
    }
    next()
  } catch (err) {
    next({
      message: '您的Token信息有误，请重新登录',
      code: 401
    })
  }
})

// 是否有权限访问接口
// 需要创建角色和接口地址的映射关系，todo
// export const hasAuth = async (req, res, next) => {
//   if (!req.employee || !req.employee.RoleId) {
//     return next({
//       message: "未授权",
//       statusCode: 401,
//     })
//   }
//   next()
// }


// exports.admin = async (req, res, next) => {
//   if (req.user.isAdmin) {
//     next();
//   }

//   return next({
//     message: "Authorization denied, only admins can visit this route",
//     statusCode: 401,
//   });
// };
