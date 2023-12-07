// PenampilanData.js

const Baju = require('../models/baju');
const Pelanggan = require('../models/pelanggan');

const endpoint1 = async (req, res) => {
    try {
        const bajuData = await Baju.find();
        return res.json({ success: true, data: bajuData });
    } catch (error) {
        return res.status(404).json(error);
    }

}

const endpoint2 = async (req, res) => {
    try {
        const { id } = req.params;
        const baju = await Baju.findById(id);
        if (!baju) {
            return res.status(404).json({ success: false, message: 'Baju Not Found' });
        }
        return res.json({ success: true, data: baju });
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Endpoint untuk membaca riwayat pembelian pelanggan
 * @param {*} req 
 * @param {*} res 
 */
const endpoint3 = async (req, res) => {
    try {
        const { id } = req.params;
        const pelanggan = await Pelanggan.findById(id).populate('riwayat_pembelian.transaksi');

        if (!pelanggan) {
            return res.status(404).json({ success: false, message: 'Pelanggan Not Found' });
        };
        return res.json({
            success: true,
            data: pelanggan.riwayat_pembelian
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const endpoint4 = async (req, res) => {
    try {
        const { id } = req.params;
        const pelanggan = await Pelanggan.findById(id).populate('keranjang.baju');
        if (!pelanggan) {
            return res.status(404).json({ success: false, message: 'Pelanggan Not Found' });
        };
        return res.json({
            success: true,
            data: pelanggan.keranjang
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(error);
    }
}

const endpoint5 = async (req, res) => {
    try {
        const { id } = req.params;
        const { bajuId, jumlah } = req.body;
        const pelanggan = await Pelanggan.findById(id);
        if (!pelanggan) {
            return res.status(404).json({ success: false, message: 'Pelanggan Not Found' });
        };

        await Pelanggan.findByIdAndUpdate(id, {
            $push: {
                keranjang: {
                    baju: bajuId,
                    jumlah: jumlah
                }
            }
        });

        const updatedPelanggan = await Pelanggan.findById(id).populate('keranjang.baju');
        return res.json({
            success: true,
            data: updatedPelanggan.keranjang
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: error });
    }
}

const endpoint6 = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_item } = req.body;

        const pelanggan = await Pelanggan.findById(id);
        if (!pelanggan) {
            return res.status(404).json({ success: false, message: 'Pelanggan Not Found' });
        };

        await Pelanggan.findByIdAndUpdate(id, {
            $pull: {
                keranjang: { _id: id_item }
            }
        });

        const updatedPelanggan = await Pelanggan.findById(id).populate('keranjang.baju');
        return res.json({
            success: true,
            data: updatedPelanggan.keranjang
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: error });
    }
}

const endpoint7 = async (req, res) => {
    try {
        const pelanggans = await Pelanggan.find();
        return res.json({
            success: true,
            data: pelanggans
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: error });
    }

}

const endpoint8 = async (req, res) => {
    try {
        const { id } = req.params;

        const pelanggan = await Pelanggan.findById(id);
        return res.json({
            success: true,
            data: pelanggan
        });


    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: error });
    }
}

const endpoint9 = async (req,res) => {
    try {
        const { nama} = req.body;

        // Check if a Pelanggan with the provided nama already exists
        const existingPelanggan = await Pelanggan.findOne({ nama });
        if (existingPelanggan) {
            return res.status(400).json({ success: false, message: 'Pelanggan with this email already exists' });
        }

        // Create a new Pelanggan
        const pelanggan = new Pelanggan({ nama:nama, riwayat_pembelian: [], keranjang: [] });
        await pelanggan.save();

        return res.json({ success: true, data: pelanggan });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: error });
    }
}

const endpoint10 = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the Pelanggan exists
        const pelanggan = await Pelanggan.findById(id);
        if (!pelanggan) {
            return res.status(404).json({ success: false, message: 'Pelanggan Not Found' });
        }

        // Remove the Pelanggan
        await Pelanggan.findByIdAndDelete(id);

        return res.json({ success: true, message: 'Pelanggan deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: error });
    }
}

module.exports = [
    { method: 'get', URI: '/api/pakaian', execute: endpoint1 },
    { method: 'get', URI: '/api/pakaian/:id', execute: endpoint2 },
    { method: 'get', URI: '/api/riwayat/:id', execute: endpoint3 },
    { method: 'get', URI: '/api/keranjang/:id', execute: endpoint4 },
    { method: 'post', URI: '/api/keranjang/:id', execute: endpoint5 },
    { method: 'delete', URI: '/api/keranjang/:id', execute: endpoint6 },
    { method: 'get', URI: '/api/pelanggan', execute: endpoint7 },
    { method: 'get', URI: '/api/pelanggan/:id', execute: endpoint8 },
    { method: 'post', URI: '/api/pelanggan', execute: endpoint9 },
    { method: 'delete', URI: '/api/pelanggan/:id', execute: endpoint10 },
];