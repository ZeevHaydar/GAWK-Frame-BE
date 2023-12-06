const mongoose = require('mongoose');

const pembayaranSchema = new mongoose.Schema({
    payment_point: String,
    nominal: Number
}, { versionKey: false });

const Pembayaran = mongoose.model('Pembayaran', pembayaranSchema, 'Pembayaran');

module.exports = Pembayaran;