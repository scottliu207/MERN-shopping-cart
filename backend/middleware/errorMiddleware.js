const pageNotFound = (req, res, next) => {
  const error = new Error(`Page not Found - ${req.originalUrl}`)

  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
  next()
}

export { pageNotFound, errorHandler }
