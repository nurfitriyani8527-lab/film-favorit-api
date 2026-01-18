const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const filmController = require('../controllers/filmController')

router.get('/', filmController.getAllfilms)

router.get('/:id', filmController.getFilmById)

router.post('/', authMiddleware, filmController.postFilms)

router.put('/:id',authMiddleware, filmController.updateFilms)

router.delete('/:id', authMiddleware, filmController.deleteFilms)

module.exports = router