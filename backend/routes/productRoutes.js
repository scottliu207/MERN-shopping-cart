import express from "express"
import protect, { admin } from "../middleware/authMiddleware.js"
import {
  getAllProducts,
  getProductById,
  createProductReview,
  adminCreateProduct,
  adminDeleteProduct,
  adminUpdateProduct,
} from "../controllers/productControllers.js"

const router = express.Router()

router.route("/").get(getAllProducts).post(protect, admin, adminCreateProduct)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, adminDeleteProduct)
  .put(protect, admin, adminUpdateProduct)

router.route("/:id/reviews").post(protect, createProductReview)

export default router
