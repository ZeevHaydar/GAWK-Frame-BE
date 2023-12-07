const mongoose = require('mongoose');

const pembayaranSchema = new mongoose.Schema({
    payment_point: String,
    nominal: Number,
    status: {
        type: String,
        enum: ["Belum dibayar", "Dibayar", "Batal"], default: "Belum dibayar"
    }
}, { versionKey: false });

const Pembayaran = mongoose.model('Pembayaran', pembayaranSchema, 'Pembayaran');

module.exports = Pembayaran;