const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

require("dotenv").config();



async function connectToMongoDB() {
    try {
        const uri = process.env.DATABASE_URL_OLD;

        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            dbName: "WovenWear"
        });

        console.log('Connected to MongoDB');

        // Ping the database to confirm a successful connection
        await mongoose.connection.db.admin().ping();

        mongoose.connection.on('connected', ()=> {
            console.log('DB Connected');
        });
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Propagate the error
    }
}

module.exports = connectToMongoDB;