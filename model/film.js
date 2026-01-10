const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
  judul: {
    type:String,
    required: true // required artinya judul wajib diisi begitu juga dengan author dan genre 
  },
  author: {
    type:String,
    required: true
  },
  genre: {
    type:String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0, // min dan max untuk ratingnya misal 0/10
    max: 10,
    timestamps: true // untuk auto createdAt/updateAt
  }
});
timestamps: true // untuk auto createdAt/updateAt
module.exports = mongoose.model('film',filmSchema,'films')