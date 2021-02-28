import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("找不到商品")
  }
})

// @desc Admin update product
// @route PUT /api/products:/id
// @access Private/admin

const adminUpdateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.countInStock = req.body.countInStock || product.countInStock
    product.category = req.body.category || product.category
    product.brand = req.body.brand || product.brand

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("找不到商品")
  }
})

// @desc Admin removes product
// @route DELETE /api/products:/id
// @access Private/admin
const adminDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({
      message: "商品已移除",
    })
  } else {
    res.status(404)
    throw new Error("找不到商品")
  }
})

export {
  getAllProducts,
  getProductById,
  adminDeleteProduct,
  adminUpdateProduct,
}
