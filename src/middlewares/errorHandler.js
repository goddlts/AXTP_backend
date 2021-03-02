const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal Server Error"
  // let message = "Internal Server Error"
  let code = err.statusCode || 500

  if (err.name === "SequelizeValidationError") {
    const fields = err.errors.map((field) => field.path)
    // message = `These fields should not be empty: ${fields.join(", ")}`
    message = `以下字段不能为空: ${fields.join(", ")}`
    code = 400
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const field = err.errors.map((error) => error.path)[0]
    // message = `The ${field} is already taken`
    message = `${field} 已经存在`
    code = 400
  }

  res.status(code).json({ 
    code: code, 
    message: message
  })
}

export default errorHandler