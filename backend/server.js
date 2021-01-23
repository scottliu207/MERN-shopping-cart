import express from "express"
import products from "./data/products.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()


app.get("/", (req, res) => {
    res.send("API is runing...")
})

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p=>p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000
const NODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server is running ${NODE} mode on port ${PORT}.`))