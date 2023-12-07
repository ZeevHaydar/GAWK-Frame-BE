const mongoose = require('mongoose');


const riwayatPembelianSchema = new mongoose.Schema({
  waktu: Date,
  transaksi: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaksi' },
  status: {type: String, enum: ["Belum Diantar", "Diantar"], default:"Belum Diantar"}
});

const pelangganSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    riwayat_pembelian: [riwayatPembelianSchema]
  }, { versionKey: false });

const Pelanggan = mongoose.model('Pelanggan', pelangganSchema, 'Pelanggan');

module.exports = Pelanggan;