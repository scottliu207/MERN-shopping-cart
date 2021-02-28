import express from "express"
import protect, { admin } from "../middleware/authMiddleware.js"
import {
  getAllProducts,
  getProductById,
  adminGetProducts,
} from "../controllers/productControllers.js"

const router = express.Router()

router.get("/", getAllProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, adminGetProducts)

export default router
