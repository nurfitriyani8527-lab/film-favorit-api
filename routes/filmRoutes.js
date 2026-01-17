const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const filmController = require('../controllers/filmController')

router.get('/', authMiddleware, filmController.getAllfilms)

router.get('/:id', authMiddleware, filmController.getFilmById)

router.post('/', authMiddleware, filmController.postFilms)

router.put('/:id',authMiddleware, filmController.updateFilms)

router.delete('/:id', authMiddleware, filmController.deleteFilms)

module.exports = router