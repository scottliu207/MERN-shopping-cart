import express from "express"
import { getAllProducts, getProductById } from "../controllers/productControllers.js"

const router = express.Router()


// @desc Fetch all products
// @route GET /api/products
// @access Public

router.get("/", getAllProducts)
router.get("/:id", getProductById)


export default router