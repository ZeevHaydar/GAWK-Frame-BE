// InquiryBaju.js

const Chat = require('../models/chat');

const endpoint1 = async (req, res) => {
    const  { userId } = req.query;
    if (!userId) return res.status(404).json({ success: false, message: "Data Not Found!" });
    try{
        const chatData = await Chat.findOne({pelanggan: userId});
        if (chatData) {return res.json({ success: true, data: chatData })}
        const chat = new Chat({
            pelanggan: userId,
            pesan: []
        });
        await chat.save();
        return res.json({ success: true, data: chat });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const endpoint2 = async (req, res) => {
    const { userId } = req.query;
    const { sender, message } = req.body;
    if (!userId) return res.status(404).json({ success: false, message: "Data Not Found!" });
    try{
        const chatData = await Chat.findOne({pelanggan: userId});
        if (sender !== 'pelanggan' && sender !== 'karyawan') {throw new Error('Invalid sender')}
        const pesan = {
            pengirim: sender,           // 'pelanggan' or 'karyawan'
            waktu: new Date(),
            isi: message
        }
        chatData.pesan.push(pesan);
        await chatData.save();
        return res.json({ success: true, data: chatData });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const endpoint3 = async (req, res) => {
    const { userId } = req.query;
    const { messageId } = req.body;
    if (!userId) return res.status(404).json({ success: false, message: "Data Not Found!" });
    try{
        const chatData = await Chat.findOne({pelanggan: userId});
        chatData.pesan.pull(chatData.pesan.id(messageId));
        await chatData.save();
        return res.json({ success: true, data: chatData });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = [
    {method: 'get', URI: '/api/chat', execute: endpoint1},      // get chat & make new if not exists
    {method: 'post', URI: '/api/chat', execute: endpoint2},     // post pesan to chat
    {method: 'delete', URI: '/api/chat', execute: endpoint3},   // delete pesan from chat    
]