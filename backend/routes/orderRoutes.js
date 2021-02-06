import express from "express"
import protect from "../middleware/authMiddleware.js"
import {
  addOrder,
  getMyOrder,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderControllers.js"

const router = express.Router()

router.route("/").post(protect, addOrder)
router.route("/myorder").get(protect, getMyOrder)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
export default router
