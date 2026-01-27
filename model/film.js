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
    type:Number,
    default: 0,
    min: 0,
    max: 10
  },
  deskripsi: {
    type: String,
    required: true
  },  
  image: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  },
{
  timestamps: true
});
module.exports = mongoose.model('film',filmSchema,'films')