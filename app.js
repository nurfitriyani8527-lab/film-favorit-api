const express = require('express')
const connectDB = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const filmRoutes = require('./routes/filmRoutes')
const fs = require('fs')
require('dotenv').config()
const app = express()
const port = 3000

connectDB()

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes)
app.use('/films', filmRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})