const mongoose = require('mongoose'); // Mengimpor modul Mongoose untuk mengakses dan berinteraksi dengan MongoDB.
mongoose.Promise = global.Promise; // Mengatur Promise global yang digunakan oleh Mongoose agar menggunakan implementasi Promise yang sudah ada dalam lingkungan Node.js.

const db = {}; // Mendefinisikan objek db yang akan menyimpan berbagai model yang dihubungkan dengan Mongoose dan informasi terkait database lainnya.

db.mongoose = mongoose; // Menyimpan instance Mongoose ke dalam objek db, sehingga Mongoose dapat diakses dan digunakan dari modul lain dalam aplikasi.

db.user = require("./user.model"); // Mengimpor definisi model "user" dan "role" yang berada di file terpisah "user.model.js" dan "role.model.js". Model-model ini mendefinisikan skema dan skema model untuk data yang akan disimpan dalam koleksi "users" dan "roles" dalam database MongoDB.
db.role = require("./role.model");

db.ROLES = ["user", "admin"];// Mendefinisikan daftar peran (roles) yang dapat digunakan dalam aplikasi. Dalam kasus ini, hanya ada dua peran yang didefinisikan, yaitu "user" dan "admin".

module.exports = db; // Mengekspor objek db sehingga dapat diakses oleh modul lain dalam aplikasi.