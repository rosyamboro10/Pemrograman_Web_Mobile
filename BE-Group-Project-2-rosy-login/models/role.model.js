const mongoose = require("mongoose"); // Mengimpor modul Mongoose untuk mengakses dan berinteraksi dengan MongoDB.

const Role = mongoose.model( // Membuat model "Role" menggunakan fungsi mongoose.model(). Model ini akan mewakili koleksi "roles" dalam database MongoDB. Fungsi mongoose.model() menerima dua parameter, yaitu nama model (dalam hal ini "Role") dan skema model.
  "Role",
  new mongoose.Schema({ // Membuat skema model menggunakan mongoose.Schema. Skema ini mendefinisikan struktur dan tipe data yang akan disimpan dalam koleksi "roles".
    name: String // Dalam kasus ini, skema model "Role" memiliki satu properti yaitu "name" dengan tipe data String.
  })
);

module.exports = Role; // Mengekspor model "Role" sehingga dapat diakses dan digunakan oleh modul lain dalam aplikasi.
