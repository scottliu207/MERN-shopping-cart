import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  adminGetUsers,
  adminGetUserDetail,
  adminDelUser,
  adminUpdatedUserDetail,
} from "../controllers/userControllers.js"
import protect, { admin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route("/").post(registerUser).get(protect, admin, adminGetUsers)
router
  .route("/:id")
  .delete(protect, admin, adminDelUser)
  .get(protect, admin, adminGetUserDetail)
  .put(protect, admin, adminUpdatedUserDetail)

export default router
