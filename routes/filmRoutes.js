const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const multer = require('multer');
const filmController = require('../controllers/filmController')
const upload = require('../config/multer')

router.get('/', filmController.getAllfilms)

router.get('/:id', filmController.getFilmById)

router.post('/', authMiddleware, upload.single('image'), filmController.postFilms)

router.put('/:id',authMiddleware, filmController.updateFilms)

router.delete('/:id', authMiddleware, filmController.deleteFilms)

module.exports = router