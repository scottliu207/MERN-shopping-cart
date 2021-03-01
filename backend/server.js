import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import {
  errorHandler,
  pageNotFound,
  productCreateErrorHandler,
} from "./middleware/errorMiddleware.js"
import path from "path"

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is runing...")
  })
}

app.use(pageNotFound)
app.use(productCreateErrorHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server is running ${NODE} mode on port ${PORT}.`))
