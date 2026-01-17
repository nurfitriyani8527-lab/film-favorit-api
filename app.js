const express = require('express')
const connectDB = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const filmRoutes = require('./routes/filmRoutes')
require('dotenv').config()
const app = express()
const port = 3000

connectDB()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/films', filmRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
