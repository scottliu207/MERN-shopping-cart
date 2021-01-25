import express from "express"
import { authUser, getUserProfile, registerUser } from "../controllers/userControllers.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()
// @desc
// @route
// @access
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile)
router.post("/", registerUser)

export default router
