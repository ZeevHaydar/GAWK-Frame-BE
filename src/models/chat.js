const mongoose = require('mongoose');

const pesanSchema = new mongoose.Schema({
    waktu: Date,
    isi: String
});

const chatSchema = new mongoose.Schema({
    pelanggan: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelanggan', required:true },
    pesan: [pesanSchema]
}, { versionKey: false });

const Chat = mongoose.model('Chat', chatSchema, 'Chat');

module.exports = Chat