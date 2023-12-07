// PenampilanData.js

const Baju = require('../models/baju');
const Pelanggan = require('../models/pelanggan');

const endpoint1 = async (req, res) => {
    try{
        const bajuData = await Baju.find();
        return res.json({ success: true, data: bajuData });
    }catch(error){
        return res.status(404).json(error);
    }
    
}

const endpoint2 = async (req,res) => {
    try {
        const {id} = req.params;
        const baju = await Baju.findById(id);
        if (!baju){
            return res.status(404).json({success: false, message: 'Baju Not Found'});
        }
        return res.json({success: true, data: baju});
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Endpoint untuk membaca riwayat pembelian pelanggan
 * @param {*} req 
 * @param {*} res 
 */
const endpoint3 = async (req,res) => {
    try {
        const {id} = req.params;
        const pelanggan = await Pelanggan.findById(id).populate('riwayat_pembelian.transaksi');
    
        if (!pelanggan){
            return res.status(404).json({success: false, message: 'Pelanggan Not Found'});
        };
        return res.json({
            success: true,
            data: pelanggan.riwayat_pembelian
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = [
    {method: 'get', URI: '/api/pakaian', execute: endpoint1},
    {method: 'get', URI: '/api/pakaian/:id', execute: endpoint2},
    {method: 'get', URI: '/api/riwayat/:id', execute: endpoint3}
];