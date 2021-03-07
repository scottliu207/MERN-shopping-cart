import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "請輸入商品名稱"],
    },
    image: {
      type: String,
      required: [true, "請提供圖片"],
    },
    description: {
      type: String,
      required: [true, "請輸入商品敘述"],
    },
    brand: {
      type: String,
      required: [true, "請輸入商品品牌"],
    },
    category: {
      type: String,
      required: [true, "請輸入商品分類"],
    },
    price: {
      type: Number,
      required: [true, "請輸入商品金額"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "請輸入新增的商品數量"],
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product
