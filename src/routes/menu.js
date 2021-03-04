import express from 'express'
import { getAuthMenuTree, menuTree, allMenuTree, menuSelect, add, detail, del, update } from '../controllers/menu.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

// 路由规则
// 当前登录用户的路由
router.route('/routes').get(protect, getAuthMenuTree)
router.route('/menutrees').get(protect, menuTree)

// 增删改查
router.route('/menu-select').get(protect, menuSelect)

router.route('/').get(protect, allMenuTree)
router.route('/').post(protect, add)
router.route('/:id').get(protect, detail)
router.route('/:id').delete(protect, del)
router.route('/:id').put(protect, update)
export default router