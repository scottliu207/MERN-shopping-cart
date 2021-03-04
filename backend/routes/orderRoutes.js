import express from "express"
import protect, { admin } from "../middleware/authMiddleware.js"
import {
  addOrder,
  getMyOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrderList,
} from "../controllers/orderControllers.js"

const router = express.Router()

router.route("/").post(protect, addOrder).get(protect, admin, getOrderList)
router.route("/myorder").get(protect, getMyOrder)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver)
export default router
