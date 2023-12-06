const mongoose = require('mongoose');

const pembelianBajuSchema = new mongoose.Schema({
    baju: { type: mongoose.Schema.Types.ObjectId, ref: 'Baju' },
    jumlah: Number
});

// Define Transaksi Schema
const transaksiSchema = new mongoose.Schema({
    pelanggan: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelanggan' },
    pembelian_baju: [pembelianBajuSchema],
    pembayaran: { type: mongoose.Schema.Types.ObjectId, ref: 'Pembayaran' }
}, { versionKey: false });

const Transaksi = mongoose.model('Transaksi', transaksiSchema, 'Transaksi');

module.exports = Transaksi;