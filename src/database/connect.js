const { MongoClient, ServerApiVersion  } = require('mongodb');

require("dotenv").config();



async function connectToMongoDB() {
    const uri = process.env.DATABASE_URL;
    
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return client; // Return the connected client
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error; // Propagate the error
    }
  }
  
  module.exports = connectToMongoDB;