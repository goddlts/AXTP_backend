import express from 'express'
import { login } from '../controllers/auth.js'

const router = express.Router()

// 路由规则
router.route('/login').post(login)

export default router