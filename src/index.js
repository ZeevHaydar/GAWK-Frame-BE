const express = require('express');

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`App now listening to port ${PORT}`);
})

app.get("/", (req,res) => {
    res.send("<h1><strong> Hello World!! </strong></h1>")
})
