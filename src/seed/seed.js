const mongoose = require('mongoose');
const Baju = require('../models/baju');
const Pelanggan = require('../models/pelanggan');
const Transaksi = require('../models/transaksi');

require("dotenv").config();

const uri = process.env.DATABASE_URL_OLD;



const seedBaju = async () => {
    try {
        const bajuData = [
            { nama: 'Kemeja Nanami Kento (hangus terbakar)', harga: 500000, kategori: 'Formal', stok: 20 },
            { nama: 'Baju Pramuka', harga: 30000, kategori: 'Formal', stok: 15 },
        ];

        // await Baju.insertMany(bajuData);
        const savePromises = bajuData.map(async (p, index) => {
            const existingBaju = await Baju.findOne({ nama: p.nama });

            if (!existingBaju) {
                const newBaju = new Baju(p);
                await newBaju.save();
            } else {
                console.log(`Baju with nama '${p.nama}' already exists. Skipping...`);
            }
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
            { nama: 'Pelanggan 1', riwayat_pembelian: [], keranjang: [] },
            { nama: 'Pelanggan 2', riwayat_pembelian: [], keranjang: [] },
        ];

        const savePromises = pelangganData.map(async (p, index)=> {
            const existingPelanggan = await Pelanggan.findOne({ nama: p.nama });

            if (!existingPelanggan) {
                const newPelanggan = new Pelanggan(p);
                await newPelanggan.save();
            } else {
                console.log(`Pelanggan with nama '${p.nama}' already exists. Skipping...`);
            }
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

