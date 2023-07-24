const mongoose = require("mongoose"); // Mengimpor modul Mongoose untuk mengakses dan berinteraksi dengan MongoDB.

const User = mongoose.model( // Membuat model "User" menggunakan fungsi mongoose.model(). Model ini akan mewakili koleksi "users" dalam database MongoDB. Fungsi mongoose.model() menerima dua parameter, yaitu nama model (dalam hal ini "User") dan skema model.
  "User",
  new mongoose.Schema({ //  Membuat skema model menggunakan mongoose.Schema. Skema ini mendefinisikan struktur dan tipe data yang akan disimpan dalam koleksi "users".
    username: String,
    email: String,
    password: String,
    roles: [ // Properti ini memiliki tipe data Array yang berisi objek ObjectId yang merujuk ke model "Role". Properti ini digunakan untuk menyimpan daftar peran (roles) yang dimiliki oleh pengguna. Setiap peran diwakili oleh ObjectId yang merujuk ke entri dalam koleksi "roles".
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User; // Mengekspor model "User" sehingga dapat diakses dan digunakan oleh modul lain dalam aplikasi.
