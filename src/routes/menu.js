import express from 'express'
import { getAuthMenuTree } from '../controllers/menu.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

// 路由规则
// 当前登录用户的路由
router.route('/routes').get(protect, getAuthMenuTree)

export default router