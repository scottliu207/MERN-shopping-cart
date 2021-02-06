import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { errorHandler, pageNotFound } from "./middleware/errorMiddleware.js"
import path from "path"

dotenv.config()

const app = express()

app.use(express.json())

connectDB()
app.get("/", (req, res) => {
  res.send("API is runing...")
})

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use(pageNotFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server is running ${NODE} mode on port ${PORT}.`))
