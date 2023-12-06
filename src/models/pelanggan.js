const mongoose = require('mongoose');

const pelangganSchema = new mongoose.Schema({
    nama: { type: String, required: true },
  });

module.exports = mongoose.model('Pelanggan', pelangganSchema, 'Pelanggan');