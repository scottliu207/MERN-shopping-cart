import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utlis/generateToken.js"

// @desc Auth users & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({
    email: email,
  })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("使用者帳號或密碼不正確")
  }
})

// @desc get user profile after login
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("找不到使用者")
  }
})

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    if (req.body.password && (await user.matchPassword(req.body.password))) {
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.newPassword
        ? req.body.newPassword
        : user.password

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      })
    } else {
      res.status(401)
      throw new Error("密碼錯誤")
    }
  } else {
    res.status(404)
    throw new Error("找不到使用者")
  }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({
    email: email,
  })

  if (userExists) {
    res.status(400)
    throw new Error("信箱已被使用")
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  })

  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("無效的使用名稱或信箱")
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
