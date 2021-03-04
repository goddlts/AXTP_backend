import express from 'express'
import { list, add, del, update, detail, userids } from '../controllers/role.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

// 路由规则
// 批量设置用户角色
// /api/v1/role/2/userids
router.route('/:id/userids').post(protect, userids)

router.route('/').get(protect, list)
router.route('/').post(protect, add)
router.route('/:id').get(protect, detail)
router.route('/:id').delete(protect, del)
router.route('/:id').put(protect, update)

export default router