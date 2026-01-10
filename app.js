const express = require('express')
const respon = require('./utils/response')
const connectDB = require('./config/database')
const film = require('./model/film')
require('dotenv').config()
const app = express()
const port = 3000

connectDB()

app.use(express.json())

app.get ('/films', async (req, res) => {
    const films = await film.find()
    respon(res,200,true,"data berhasil dimunculkan",films)
    if(films.length === 0){
        respon(res,404,false,"data kosong",films)
    }
})

app.get('/films/:_id', async(req,res) => {
    const _id =  req.params._id
    const films = await film.findById(_id)

    if(!films){
            return respon(res,404,false,`data dengan id ${_id} tidak ditemukan`,films)
        } else{
    respon(res,200,true,`data dengan id ${_id} berhasil ditemukan`,films)
        }
})

app.post('/films', async (req,res) => {
    const { judul, author, genre, rating } = req.body
    if( !judul || !author || !genre || !rating){
        return respon(res,400,false,"tidak bisa menambahkan film favorit",{
            fields: {
                judul: !judul ? "judul wajib diisi" : null,
                author: !author ? "author wajib diisi" : null,
                genre: !genre ? "genre wajib diisi" : null,
                rating: !rating ? "rating wajib diisi" : null,
                }
        })
    }
    try {
        const dataBaruFilms = new film({
            judul,
            author, 
            genre, 
            rating
        })
        await dataBaruFilms.save()

        respon(res,201,true,"berhasil menambah film ke favorit",dataBaruFilms)
    } catch (error) {
        respon(res,500,false,"terjadi kesalahan saat menambahkan film",error.message)
    }
})

app.put('/films/:_id', async(req,res) => {
    try {
        const filmId = req.params._id;
        const { judul, author, genre, rating } = req.body;
        
        const filmUpdate = await film.findByIdAndUpdate(
            filmId, 
            { judul, author, genre, rating },
            { 
                new: true,
                runValidators: true
            }
        );
        
        if(!filmUpdate) {
            return respon(res, 404, false, "Film tidak ditemukan", null);
        }
        
        respon(res, 200, true, "Film berhasil diupdate", filmUpdate);
    } catch (error) {
        respon(res, 500, false, error.message, null);
    }
});


app.delete('/films/:_id', async (req,res) => {
    const _id = req.params._id
    const films = await film.findById(_id)

    if(films === 0){
        return respon(res,404,false,`data dengan judul ${_id} tidak ditemukan`,deleteFilmBefore)
    }
    const deleteFilmAfter = film[films]
    films.deleteOne(_id)

    respon(res,200,true,"film favorit berhasil dihapus",deleteFilmAfter)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
