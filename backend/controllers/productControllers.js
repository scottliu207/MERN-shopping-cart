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

// @desc Admin create product
// @route POST /api/products
// @access Private/admin
export const adminCreateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    countInStock,
    category,
    brand,
    description,
  } = req.body

  const newProduct = await Product.create({
    name: "Sample",
    price: 0,
    image: "/images/sample.jpg",
    countInStock: 0,
    category: "Sample",
    brand: "Sam",
    description: "This is sample item",
    user: req.user._id,
  })

  res.json(newProduct)
})

// @desc Admin update product
// @route PUT /api/products:/id
// @access Private/admin

const adminUpdateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    countInStock,
    image,
    category,
    brand,
    description,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name || product.name
    product.price = price || product.price
    product.countInStock = countInStock || product.countInStock
    product.image = image || product.image
    product.category = category || product.category
    product.brand = brand || product.brand
    product.description = description || product.description

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
