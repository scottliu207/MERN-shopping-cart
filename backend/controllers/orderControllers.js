import Order from "../models/orderModel.js"
import asyncHandler from "express-async-handler"

// @desc add order to  database
// @route POST /api/order
// @ access Private
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  } else {
    const order = new Order({
      orderItems: orderItems,
      user: req.user._id,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemPrice: itemPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    })
    console.log(order)

    const createOrder = await order.save()
    res.status(201)
    res.json(createOrder)
  }
})

// @desc get order detail from database
// @route GET /api/order/:id
// @ access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("訂單不存在")
  }
})

// @desc update order to paid
// @route PUT /api/order/:id/pay
// @ access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("訂單不存在")
  }
})

// @desc get user's order
// @route GET /api/orders/myorder
// @ access Private
const getMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id })
  res.json(order)
})
export { addOrder, getOrderById, updateOrderToPaid, getMyOrder }
