// index.js

const express = require('express');
const connectToMongoDB = require('./database/connect');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(cors());
const PORT = 8000;
const traverseInterface = require('./utils/handlers');



require("dotenv").config();

const interfacesPath = path.join(__dirname, "interfaces");

connectToMongoDB().then(()=> {"connect to database"}).catch(()=> {console.error("Error when connecting")});


app.listen(PORT, () => {
    console.log(`App now listening to port ${PORT}`);
})

traverseInterface(interfacesPath, app);



app.get("/", (req,res) => {
    res.send("<h1><strong> Hello World!! </strong></h1>")
})
