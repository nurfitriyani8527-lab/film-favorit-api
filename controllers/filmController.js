const film = require('../model/film')
const jwt = require('jsonwebtoken')
const respon = require('../utils/response')

exports.getAllfilms = async (req,res) => {
    try {
        const films = await film.find().populate('createdBy','name email')
        if(films.length === 0){
            return respon(res,404,false,"data kosong",films)
        }
        respon(res,200,true,"data berhasil dimunculkan",films)
    } catch(error) {
        respon(res,500,false,"gagal mengambil data film",error.message)
    }
}

exports.getFilmById = async (req,res) => {
    try {
        const _id = req.params.id
        const films = await film.findById(_id).populate('createdBy','name email')
        if(!films){
            return respon(res,404,false,`Film dengan id ${_id} tidak ditemukan`,null)
        }
        respon(res,200,true,`Film dengan id ${_id} berhasil ditemukan`,films)
    } catch(error) {
        respon(res,500,false,"Error mencari film",error.message)
    }
}

exports.postFilms = async (req,res) => {
    const { judul, author, genre, rating } = req.body
        console.log("user login",req.user)
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
                rating,
                createdBy: req.user._id
            })
            await dataBaruFilms.save()
    
            respon(res,201,true,"berhasil menambah film ke favorit",dataBaruFilms)
        } catch (error) {
            respon(res,500,false,"terjadi kesalahan saat menambahkan film",error.message)
        }
}

exports.updateFilms = async (req,res) => {
    try {
        const filmId = req.params.id;
        const { judul, author, genre, rating } = req.body;
        console.log("user login",req.user)
        const cekFilm = film.createdBy === req.user._id
        if(!cekFilm){
            return respon(res,403,false,"anda tidak boleh update ini karena ini bukan buatan anda!")
        }
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
}

exports.deleteFilms = async (req,res) => {
    try {
        const _id = req.params.id
        console.log("user login",req.user)
        const cekFilm = film.createdBy === req.user._id
        if(!cekFilm){
            return respon(res,403,false,"anda tidak bisa menghapus milik orang lain!")
        }
        const films = await film.findByIdAndDelete(_id)
        if(!films){
            return respon(res,404,false,`Film dengan id ${_id} tidak ditemukan`,null)
        }
        respon(res,200,true,"Film favorit berhasil dihapus",films)    
    } catch(error) {
        respon(res,500,false,"Error menghapus film",error.message)
    }
}