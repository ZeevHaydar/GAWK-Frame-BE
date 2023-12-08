// index.js

const express = require('express');
const connectToMongoDB = require('./database/connect');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(cors());

const traverseInterface = require('./utils/handlers');



require("dotenv").config();
const PORT = process.env.PORT || 3000;;
const interfacesPath = path.join(__dirname, "interfaces");

connectToMongoDB().then(()=> {"connect to database"}).catch(()=> {console.error("Error when connecting")});


app.listen(PORT,"0.0.0.0", () => {
    console.log(`App now listening to port ${PORT}`);
})

traverseInterface(interfacesPath, app);



app.get("/", (req, res) => {
    const htmlContent = `
        <h1><strong>This is the backend home page!</strong></h1>
        <h2>To use the backend services, please refer to the Github README section.</h2>
    `;

    const apiDocumentation = `
        <p>Pembayaran:
            - method: post, url: '/api/transaksi', query: userID
            - method: get, url: '/api/transaksi', body: pembelian_baju
        </p>
        <p>InquiryBaju:
            - method: get, url: '/api/chat/:userId',
            - method: post, url: '/api/chat/:userId', body: sender, message
            - method: delete, url: '/api/chat/:userId', body: messageId
        </p>
        <p>PenampilanData:
            - method: get, url: 'api/pakaian'
            - method: get, url: 'api/pakaian/:id'
            - method: get, url: 'api/riwayat/:id'
            - method: get, url: '/api/keranjang/:id'
            - method: post, url: '/api/keranjang/:id', body: bajuId, jumlah
            - method: delete, url: '/api/keranjang/:id', body: id_item
            - method: get, url: '/api/pelanggan'
            - method: get, url: '/api/pelanggan/:id'
            - method: post, url: '/api/pelanggan', body: nama
            - method: delete, url: '/api/pelanggan/:id'
        </p>
    `;

    const combinedContent = htmlContent + apiDocumentation;

    res.send(combinedContent);
});
