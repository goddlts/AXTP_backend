import express from 'express'
import { login, me, signout } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'


const router = express.Router()

// 路由规则
router.route('/login').post(login)
router.route('/me').get(protect, me)
router.route('/signout').get(protect, signout)

export default router