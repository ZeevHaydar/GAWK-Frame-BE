// PenampilanData.js

const Baju = require('../models/baju');

const endpoint1 = async (req, res) => {
    try{
        const bajuData = await Baju.find();
        return res.json({ success: true, data: bajuData });
    }catch(error){
        return res.status(404).json(error)
    }
    
}

module.exports = [
    {method: 'get', URI: '/api/pakaian', execute: endpoint1}
];