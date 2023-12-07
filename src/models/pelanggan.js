const mongoose = require('mongoose');


const riwayatPembelianSchema = new mongoose.Schema({
  waktu: Date,
  transaksi: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaksi' },
  status: {type: String, enum: ["Belum Diantar", "Diantar"], default:"Belum Diantar"}
});

const keranjangSchema =  new mongoose.Schema({
  baju: { type: mongoose.Schema.Types.ObjectId, ref: 'Baju' },
  jumlah: Number
});

const pelangganSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    riwayat_pembelian: [riwayatPembelianSchema],
    keranjang: [keranjangSchema]
  }, { versionKey: false });

const Pelanggan = mongoose.model('Pelanggan', pelangganSchema, 'Pelanggan');

module.exports = Pelanggan;