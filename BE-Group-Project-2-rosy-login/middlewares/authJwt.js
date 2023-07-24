const jwt = require("jsonwebtoken"); // Mengimpor modul jsonwebtoken untuk mengelola JWT dan berkas konfigurasi database dari direktori "../config/db.config".
const config = require("../config/db.config");
const db = require("../models"); // Mengimpor berkas yang berisi definisi model-model yang akan digunakan dalam aplikasi dari direktori "../models".
const User = db.user; // Mendefinisikan model User dan Role yang diimpor dari "../models".
const Role = db.role;

verifyToken = (req, res, next) => { //  Ini adalah fungsi middleware untuk memverifikasi token JWT yang digunakan dalam setiap permintaan. Fungsi ini menerima permintaan (req), respons (res), dan fungsi next() sebagai parameter.
  let token = req.session.token; // Fungsi ini mengambil token dari session yang disimpan dalam req.session.token.

  if (!token) { // Jika token tidak ada, fungsi akan mengirimkan respons dengan kode status 403 (Forbidden) dan pesan "No token provided!".
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => { // Jika token ada, fungsi akan menggunakan jwt.verify() untuk memverifikasi token dengan menggunakan secret yang sama yang digunakan saat menghasilkan token. Jika token valid, fungsi akan mengurai payload JWT dan menyimpan ID pengguna (decoded.id) dalam req.userId.
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next(); // Fungsi ini akan memanggil fungsi next() untuk melanjutkan eksekusi ke middleware atau pemroses berikutnya dalam stack middleware.
  });
};

isAdmin = (req, res, next) => { //  Ini adalah fungsi middleware untuk memeriksa apakah pengguna memiliki peran "admin". Fungsi ini menerima permintaan (req), respons (res), dan fungsi next() sebagai parameter.
  User.findById(req.userId).exec((err, user) => { // Fungsi ini mengambil data pengguna berdasarkan req.userId yang sebelumnya disimpan oleh fungsi verifyToken.
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find( //  Setelah mendapatkan data pengguna, fungsi ini akan mencari roles yang dimiliki oleh pengguna dengan menggunakan ID role yang ada dalam user.roles.
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) { // Jika pengguna memiliki peran "admin", fungsi akan memanggil fungsi next() untuk melanjutkan eksekusi ke middleware atau pemroses berikutnya dalam stack middleware.
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" }); // Jika pengguna tidak memiliki peran "admin", fungsi akan mengirimkan respons dengan kode status 403 (Forbidden) dan pesan "Require Admin Role!".
        return;
      }
    );
  });
};

const authJwt = { //Mendefinisikan objek authJwt yang berisi fungsi-fungsi middleware yang dapat digunakan dalam aplikasi.
  verifyToken, 
  isAdmin,
};
module.exports = authJwt; // Mengekspor objek authJwt sehingga dapat digunakan oleh modul lain dalam aplikasi.

/* Kode ini berfungsi sebagai middleware yang akan digunakan untuk memverifikasi token JWT yang ada dalam session dan 
memeriksa peran pengguna sebelum memberikan akses ke bagian-bagian terbatas dalam aplikasi. Middleware ini dapat digunakan 
dengan memanggil fungsi-fungsi yang ada di dalamnya pada rute-rute atau endpoint-endpoint tertentu dalam aplikasi untuk melakukan 
otentikasi dan otorisasi pengguna. Dengan demikian, middleware ini membantu mengamankan aplikasi dengan memastikan hanya pengguna yang 
memiliki hak akses yang sesuai yang dapat melakukan operasi tertentu dalam sistem.*/