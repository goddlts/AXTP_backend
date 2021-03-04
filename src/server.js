import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'
import authRouter from './routes/auth.js'
import menuRouter from './routes/menu.js'
import campusRouter from './routes/baseinfo/campus.js'
import departRouter from './routes/baseinfo/depart.js'
import roleRouter from './routes/role.js'
import classRouter from './routes/baseinfo/class.js'
import classroomRouter from './routes/baseinfo/classroom.js'
import employeeRouter from './routes/baseinfo/employee.js'
// 学科管理
import subjectRouter from './routes/subject/subject.js'
import bookRouter from './routes/subject/book.js'
import chapterRouter from './routes/subject/chapter.js'

// 加载.env 配置环境变量
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
// 接口允许跨域
app.use(cors())

// 设置路由
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/menu', menuRouter)
app.use('/api/v1/campus', campusRouter)
app.use('/api/v1/depart', departRouter)
app.use('/api/v1/role', roleRouter)
app.use('/api/v1/class', classRouter)
app.use('/api/v1/classroom', classroomRouter)
app.use('/api/v1/user', employeeRouter)
app.use('/api/v1/subject', subjectRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/chapter', chapterRouter)

// 错误
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`))