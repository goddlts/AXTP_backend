import express from 'express'
import { list, add, del, update, detail } from '../controllers/class.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

// 路由规则
router.route('/').get(protect, list)
router.route('/').post(protect, add)
router.route('/:id').get(protect, detail)
router.route('/:id').delete(protect, del)
router.route('/:id').put(protect, update)

export default router