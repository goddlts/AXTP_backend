import { Menu } from '../src/sequelize.js'

// 教学中心-二级菜单
Menu.bulkCreate([
  {
    menuName: '出勤管理',
    parentId: 5,
    component: 'views/tcenter/attendance/attendance',
    hidden: false,
    path: '/tcenter/attendance',
    icon: 'el-icon-menu',
    order: 1
  },
  {
    menuName: '点名表',
    parentId: 5,
    component: 'views/tcenter/attendance/calltheroll',
    hidden: true,
    path: '/tcenter/:id/calltheroll',
    icon: 'el-icon-menu',
    order: 2
  },
  {
    menuName: '出勤详情',
    parentId: 5,
    component: 'views/tcenter/attendance/attendancedetail',
    hidden: true,
    path: '/tcenter/:id/attendance',
    icon: 'el-icon-menu',
    order: 3
    // "activeMenu": "/tcenter/attendance"
  },
  {
    menuName: '考试管理',
    parentId: 5,
    component: 'views/tcenter/exam/index',
    hidden: false,
    path: '/tcenter/exam',
    icon: 'el-icon-menu',
    order: 4
  },
  {
    menuName: '录入成绩',
    parentId: 5,
    component: 'views/tcenter/exam/inputscore',
    hidden: true,
    path: '/tcenter/exam/inputscore/:examid/:classid',
    icon: 'el-icon-menu',
    order: 5
    // "activeMenu": "/tcenter/exam"
  }
])

// 教务中心-二级菜单
Menu.bulkCreate([
  {
    menuName: '教务排课',
    parentId: 4,
    component: 'views/eacenter/schedule',
    hidden: false,
    path: '/eacenter/schedule',
    icon: 'el-icon-menu',
    order: 1
  }
])

// 学科数据-二级菜单
// Menu.bulkCreate([
//   {
//     menuName: '学科管理',
//     parentId: 3,
//     component: 'views/subject/index',
//     hidden: false,
//     path: '',
//     icon: 'el-icon-menu',
//     order: 1
//   },
//   {
//     menuName: '书籍管理',
//     parentId: 3,
//     component: 'views/subject/book',
//     hidden: false,
//     path: '/subject/book',
//     icon: 'el-icon-menu',
//     order: 2
//   },
//   {
//     menuName: '章节管理',
//     parentId: 3,
//     component: 'views/subject/chapter',
//     hidden: false,
//     path: '/subject/chapter',
//     icon: 'el-icon-menu',
//     order: 3
//   },
//   {
//     menuName: '反馈条目',
//     parentId: 3,
//     component: 'views/subject/feedback',
//     hidden: false,
//     path: '/subject/feedback',
//     icon: 'el-icon-menu',
//     order: 4
//   },
// ])


// 基础数据-二级菜单
// Menu.bulkCreate([
//   {
//     menuName: '校区管理',
//     parentId: 2,
//     component: 'views/baseinfo/campus',
//     hidden: false,
//     path: '/baseinfo/campus',
//     icon: 'el-icon-menu',
//     order: 1
//   },
//   {
//     menuName: '部门管理',
//     parentId: 2,
//     component: 'views/baseinfo/depart',
//     hidden: false,
//     path: '/baseinfo/depart',
//     icon: 'el-icon-menu',
//     order: 2
//   },
//   {
//     menuName: '员工管理',
//     parentId: 2,
//     component: 'views/baseinfo/user',
//     hidden: false,
//     path: '/baseinfo/user',
//     icon: 'el-icon-menu',
//     order: 3
//   },
//   {
//     menuName: '班级管理',
//     parentId: 2,
//     component: 'views/baseinfo/class',
//     hidden: false,
//     path: '/baseinfo/class',
//     icon: 'el-icon-menu',
//     order: 4
//   },
//   {
//     menuName: '教室管理',
//     parentId: 2,
//     component: 'views/baseinfo/classroom',
//     hidden: false,
//     path: '/baseinfo/classroom',
//     icon: 'el-icon-menu',
//     order: 5
//   },
//   {
//     menuName: '学生管理',
//     parentId: 2,
//     component: 'views/baseinfo/student',
//     hidden: false,
//     path: '/baseinfo/student',
//     icon: 'el-icon-menu',
//     order: 5
//   }
// ])


// 权限管理-二级菜单
// Menu.bulkCreate([
//   {
//     menuName: '角色管理',
//     parentId: 1,
//     component: 'views/sys/role',
//     hidden: false,
//     path: 'role',
//     icon: 'el-icon-menu',
//     order: 1
//   },
//   {
//     menuName: '菜单管理',
//     parentId: 1,
//     component: 'views/sys/menu',
//     hidden: false,
//     path: 'menu',
//     icon: 'el-icon-menu',
//     order: 2
//   },
//   {
//     menuName: '分配角色',
//     parentId: 1,
//     component: 'views/sys/set',
//     hidden: false,
//     path: 'set',
//     icon: 'el-icon-menu',
//     order: 3
//   }
// ])



// 一级菜单
// Menu.create({
//   menuName: '权限管理',
//   parentId: 0,
//   component: 'layout',
//   hidden: false,
//   path: '/sys',
//   icon: 'el-icon-s-management',
//   order: 1
// })

// Menu.create({
//   menuName: '基础数据',
//   parentId: 0,
//   component: 'layout',
//   hidden: false,
//   path: '/baseinfo',
//   icon: 'el-icon-s-document',
//   order: 2
// })

// Menu.create({
//   menuName: '课程管理',
//   parentId: 0,
//   component: 'layout',
//   hidden: false,
//   path: '/subject',
//   icon: 'el-icon-s-data',
//   order: 3
// })

// Menu.create({
//   menuName: '教务中心',
//   parentId: 0,
//   component: 'layout',
//   hidden: false,
//   path: '/eacenter',
//   icon: 'el-icon-s-data',
//   order: 4
// })

// Menu.create({
//   menuName: '教学中心',
//   parentId: 0,
//   component: 'layout',
//   hidden: false,
//   path: '/tcenter',
//   icon: 'el-icon-s-platform',
//   order: 5
// })

