const Transaksi = require('../models/transaksi');
const Pembayaran = require('../models/pembayaran');
const Baju = require('../models/baju');
const Pelanggan = require('../models/pelanggan');

const endpoint1 = async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User empty' });
    }
    try {
        // Check if user exists
        const user = await Pelanggan.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const { pembayaran_data } = req.body;
        const { pembelian_data } = req.body;

        const hargaDanJumlahPromise = pembelian_data.map(async ({ id, jumlah }) => {
            const baju = await Baju.findById(id);
            if (!baju) {
                return { "harga": 0, "jumlah": 0 };
            }
            const harga = baju.harga;
            return { "harga": harga, "jumlah": jumlah };
        });

        const hargaDanJumlah = await Promise.all(hargaDanJumlahPromise);

        // add pembayaran to database
        const nominal = hargaDanJumlah.reduce((acc, { harga, jumlah }) => acc + harga * jumlah, 0);

        
        const pembayaran = new Pembayaran({
            payment_point: pembayaran_data.payment_point,
            nominal: nominal
        });

        await pembayaran.save();

        // add transaksi to database
        const transaksi = new Transaksi({
            pelanggan: userId,
            pembelian_baju: pembelian_data.map(item => ({
                baju: item.id,
                jumlah: item.jumlah
            })),
            pembayaran: pembayaran._id
        });
        await transaksi.save();

        // add riwayat transaksi to database
        await Pelanggan.findByIdAndUpdate(userId, {
            $push: {
                riwayat_pembelian: {
                    waktu: new Date(),
                    transaksi: transaksi._id
                }
            }
        });

        const updatedPelanggan = await Pelanggan.findById(userId).populate('riwayat_pembelian.transaksi');
        return res.json({
            success: true, data: {
                pembayaran: pembayaran,
                transaksi: transaksi,
                riwayat_pembelian: updatedPelanggan.riwayat_pembelian
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

};

const endpoint2 = async (req, res) => {
    const { pembelian_baju } = req.body;
    if (!pembelian_baju) return res.status(404).json({ success: false, message: "Data Not Found!" });

    try {
        const hargaDanJumlahPromise = pembelian_baju.map(async ({ id, jumlah }) => {
            const baju = await Baju.findById(id);
            if (!baju) {
                return { "harga": 0, "jumlah": 0 };
            }
            const harga = baju.harga;
            return { "harga": harga, "jumlah": jumlah };
        });

        const hargaDanJumlah = await Promise.all(hargaDanJumlahPromise);

        const total = hargaDanJumlah.reduce((acc, { harga, jumlah }) => acc + harga * jumlah, 0);


        return res.json(
            {
                success: true,
                data: {
                    pembelian_baju: pembelian_baju,
                    total: total
                }
            }
        );
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

module.exports = [
    { method: 'post', URI: '/api/transaksi', execute: endpoint1 },
    { method: 'get', URI: '/api/transaksi', execute: endpoint2 }
]