const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/auth')

router.post('/register',authController.Register)

router.post('/login',authController.login)

router.delete('/logout', authMiddleware, authController.logout)

module.exports = router