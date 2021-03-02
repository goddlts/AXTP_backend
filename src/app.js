import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'
import authRouter from './routes/auth.js'

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

// 错误
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`))