const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
        console.log("database : ", process.env.MONGO_URI)
    } catch (error) {
        console.error("Error, gagal connecting ke MongoDB:", error)
        process.exit(1)
    }
}

module.exports = connectDB