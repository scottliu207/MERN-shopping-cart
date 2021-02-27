import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler(async (req, res, next) => {
  let token
  const auth = req.headers.authorization

  if (auth && auth.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findOne({ _id: decoded.id }).select("-password")

      next()
    } catch (error) {
      console.error(error)
      throw new Error("Not authorized, wrong token")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

// admin auth middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not Authorized, not Admin")
  }
}
export default protect
export { admin }
