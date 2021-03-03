import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'
import authRouter from './routes/auth.js'
import menuRouter from './routes/menu.js'
import campusRouter from './routes/baseinfo/campus.js'

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

// 错误
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`))