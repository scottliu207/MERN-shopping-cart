import users from "./data/users.js"
import products from "./data/products.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"



dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createUsers = await User.insertMany(users)
        const adminUser = createUsers[0]._id

        const sampleProducts = products.map(product=>{
            return { ...product, user:adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log("Data imported!")
        process.exit()
    } catch (error) {

        console.error(`Error: ${error.message}`)
        process.exit(1)

    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        console.log("Data destroied!")
        process.exit()
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}


if (process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
}