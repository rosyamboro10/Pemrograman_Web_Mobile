const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => { // Ini adalah fungsi middleware untuk memeriksa apakah username atau email yang diberikan dalam permintaan registrasi sudah digunakan oleh pengguna lain atau belum.
  // Username
  User.findOne({ // Fungsi ini pertama-tama mencari data pengguna berdasarkan username yang diberikan dalam permintaan menggunakan User.findOne().
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) { // Jika ditemukan pengguna dengan username yang sama, fungsi akan mengirimkan respons dengan kode status 400 (Bad Request) dan pesan "Failed! Username is already in use!".
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({ // Jika tidak ada pengguna dengan username yang sama, fungsi akan melanjutkan untuk mencari data pengguna berdasarkan email yang diberikan dalam permintaan menggunakan User.findOne().
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) { // ika ditemukan pengguna dengan email yang sama, fungsi akan mengirimkan respons dengan kode status 400 (Bad Request) dan pesan "Failed! Email is already in use!".
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next(); // Jika tidak ada pengguna dengan email yang sama juga, fungsi akan memanggil fungsi next() untuk melanjutkan eksekusi ke middleware atau pemroses berikutnya dalam stack middleware.
    });
  });
};

checkRolesExisted = (req, res, next) => { // Ini adalah fungsi middleware untuk memeriksa apakah peran (roles) yang diberikan dalam permintaan registrasi valid atau tidak.
  if (req.body.roles) { //  Fungsi ini mengecek apakah req.body.roles (daftar peran) ada dalam daftar ROLES yang diimpor dari db.
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) { // Jika salah satu peran dalam req.body.roles tidak ada dalam daftar ROLES, fungsi akan mengirimkan respons dengan kode status 400 (Bad Request) dan pesan "Failed! Role {namaPeran} does not exist!".
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next(); // Jika semua peran dalam req.body.roles valid, fungsi akan memanggil fungsi next() untuk melanjutkan eksekusi ke middleware atau pemroses berikutnya dalam stack middleware.
};

const verifyRegister = { // Mendefinisikan objek verifyRegister yang berisi fungsi-fungsi middleware yang digunakan dalam verifikasi registrasi pengguna.
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifyRegister; //  Mengekspor objek verifyRegister sehingga dapat digunakan oleh modul lain dalam aplikasi.

// Kode ini berfungsi untuk memastikan bahwa data yang diberikan dalam proses registrasi pengguna adalah valid dan tidak bertabrakan dengan data pengguna yang sudah ada dalam sistem.