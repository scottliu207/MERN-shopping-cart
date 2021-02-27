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
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
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
    email,
  })

  if (userExists) {
    res.status(400)
    throw new Error("信箱已被使用")
  }

  const user = await User.create({
    name,
    email,
    password,
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

// @desc Admin gets all users
// @route GET /api/users
// @access Private/Admin

const adminGetUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc Admin delete user
// @route DELETE /api/users/:id
// @access Private/admin

const adminDelUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({
      message: "User removed",
    })
  } else {
    res.status(404)
    throw new Error("User do not exist.")
  }
})

//@desc admin get user profile
//@route GET /api/users/:id
//@access Private/Admin

const adminGetUserDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(" -password")
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("user do not existed.")
  }
})
//@desc Admin update user profile
//@route  PUT /api/users/:id
//@access Private/Admin
const adminUpdatedUserDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("user do not existed.")
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  adminGetUsers,
  adminGetUserDetail,
  adminUpdatedUserDetail,
  adminDelUser,
}
