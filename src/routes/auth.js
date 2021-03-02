import express from 'express'
import { login, me } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'


const router = express.Router()

// 路由规则
router.route('/login').post(login)
router.route('/me').get(protect, me)

export default router