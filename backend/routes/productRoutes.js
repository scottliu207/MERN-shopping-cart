import express from "express"
import protect, { admin } from "../middleware/authMiddleware.js"
import {
  getAllProducts,
  getProductById,
  adminDeleteProduct,
  adminUpdateProduct,
} from "../controllers/productControllers.js"

const router = express.Router()

router.get("/", getAllProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, adminDeleteProduct)
  .put(protect, admin, adminUpdateProduct)

export default router
