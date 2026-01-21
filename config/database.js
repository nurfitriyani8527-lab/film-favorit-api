const mongoose = require('mongoose')
const dns = require('dns')
require('dotenv').config()

// Set DNS servers ke Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        })
        console.log("Connected to MongoDB")
        console.log("database : ", process.env.MONGO_URI)
    } catch (error) {
        console.error("Error, gagal connecting ke MongoDB:", error)
        process.exit(1)
    }
}

module.exports = connectDB