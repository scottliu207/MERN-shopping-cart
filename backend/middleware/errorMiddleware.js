// Deal with 404 not found.
const pageNotFound = (req, res, next) => {
  const error = new Error(`找不到網頁 - ${req.originalUrl}`)

  next(error)
}
// Deal with the rest error, such as wrong url.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
  next()
}

// Deal with create product error, admin only.
const productCreateErrorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errorMessages = Object.entries(err.errors)
    res.status(400)
    errorMessages.forEach((message) => {
      next(new Error(message[1]))
    })
  } else {
    next()
  }
}

export { pageNotFound, errorHandler, productCreateErrorHandler }
