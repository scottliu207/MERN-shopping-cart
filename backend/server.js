import express from "express"
import products from "./data/products.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import { errorHandler, pageNotFound } from "./middleware/errorMiddleware.js"


dotenv.config()

const app = express()

connectDB()

app.get("/", (req, res) => {
    res.send("API is runing...")
})



app.use("/api/products", productRoutes)

app.use(pageNotFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
const NODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server is running ${NODE} mode on port ${PORT}.`))