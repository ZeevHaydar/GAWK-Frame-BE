const mongoose = require('mongoose');
const Baju = require('../models/baju');
const Pelanggan = require('../models/pelanggan');

require("dotenv").config();

const uri = process.env.DATABASE_URL_OLD;



const seedBaju = async () => {
    try {
        const bajuData = [
            new Baju({ nama: 'Kemeja Nanami Kento (hangus terbakar)', harga: 500000, kategori: 'Formal', stok: 20 }),
            new Baju({ nama: 'Baju Pramuka', harga: 30000, kategori: 'Formal', stok: 15 }),
            // Add more sample Baju data as needed
        ];

        // await Baju.insertMany(bajuData);
        const savePromises = bajuData.map(async (p, index)=> {
            await p.save();
        });
        await Promise.all(savePromises);
        console.log('Baju seeding completed.');
    } catch (error) {
        console.error('Error seeding Baju:', error);
    }
};

const seedPelanggan = async () => {
    try {
        const pelangganData = [
            new Pelanggan({ nama: 'Pelanggan 1', riwayat_pembelian: [] }),
            new Pelanggan({ nama: 'Pelanggan 2', riwayat_pembelian: [] }),
            // Add more sample Pelanggan data as needed
        ];

        const savePromises = pelangganData.map(async (p, index)=> {
            await p.save();
        });
        await Promise.all(savePromises);
        console.log('Pelanggan seeding completed.');
    } catch (error) {
        console.error('Error seeding Pelanggan:', error);
    }
};

mongoose.connect(uri, { dbName: 'WovenWear' }).catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async () => {
    console.log("mongodb connected");
    await seedBaju();
    await seedPelanggan();
    mongoose.connection.close();
    
  });

