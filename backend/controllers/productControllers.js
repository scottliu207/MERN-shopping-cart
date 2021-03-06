import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc Get all products
// @route GET /api/products
// @access Public

export const getAllProducts = asyncHandler(async (req, res) => {
  // Use regular expression to search product with keyword .
  const keyword = req.query.keyword
    ? {
        name: {
          // mongoDB syntax
          // {$regex: /pattern/ , $options: /'i' for case-insensitivity/ }
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const pagePrdoucts = 4 // define how many products in a page.
  const page = req.query.page // current page.

  const productCount = await Product.count(keyword) // product counts.

  // find product with keyword if it was provided, otherwise find all.
  const products = await Product.find(keyword)
    .limit(pagePrdoucts)
    .skip(pagePrdoucts * (page - 1)) //calculate which product should be render in that page.

  const pages = Math.ceil(productCount / pagePrdoucts) // calculate total pages.

  res.json({ products, pages })
})

// @desc Get Top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-rating").limit(3)
  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error("找不到商品")
  }
})

// @desc Get single product
// @route GET /api/products/:id
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("找不到商品")
  }
})

// @desc Create a review
// @route POST /api/products/:id
// @access Private

export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    const { rating, comment } = req.body
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    //check if user already reviewed.
    if (
      product.reviews.find((r) => r.user.toString() == req.user._id.toString())
    ) {
      res.status(400)
      throw new Error("您已經留過評論")
    } else {
      product.reviews.push(review)

      // calculate new num of reviews and rating.
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.numReviews

      const newReview = await product.save()
      res.status(201).json(newReview)
    }
  } else {
    res.status(404)
    throw new Error("找不到商品")
  }
})

// @ desc Create product, admin only.
// @ route POST /api/products
// @ access Private/admin
export const adminCreateProduct = asyncHandler(async (req, res) => {
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

// @desc Update product, admin only.
// @route PUT /api/products/:id
// @access Private/admin

export const adminUpdateProduct = asyncHandler(async (req, res) => {
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

// @desc Removes product, admin only.
// @route DELETE /api/products/:id
// @access Private/admin
export const adminDeleteProduct = asyncHandler(async (req, res) => {
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
