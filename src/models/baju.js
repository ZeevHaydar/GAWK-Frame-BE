const mongoose = require('mongoose');

const bajuSchema = new mongoose.Schema({
    nama: { type: String, required:true },
    harga: { type: Number, required: true },
    kategori: { type: String, required: true },
    stok: { type: Number, required: true },
    image: { type: String, required: true },
  }, { versionKey: false });

const Baju = mongoose.model('Baju', bajuSchema, 'Baju');
module.exports = Baju;