const config = require("../config/db.config"); // Mengimpor berkas konfigurasi database dari direktori "../config/db.config". Berkas ini berisi konfigurasi untuk menghubungkan ke database.
const db = require("../models"); // Mengimpor berkas yang berisi definisi model-model yang akan digunakan dalam aplikasi dari direktori "../models".
const User = db.user; // Mendefinisikan model User dan Role yang diimpor dari "../models". Model-model ini merepresentasikan skema pengguna dan peran dalam database.
const Role = db.role;

var jwt = require("jsonwebtoken"); // Mengimpor modul jwt (JSON Web Token) dan bcryptjs yang akan digunakan untuk mengenkripsi dan memverifikasi password pengguna.
var bcrypt = require("bcryptjs");

exports.register = (req, res) => { //Ini adalah fungsi untuk menangani proses registrasi pengguna baru. Fungsi ini menerima permintaan (req) dan respons (res) sebagai parameter.
  const user = new User({ // Fungsi ini pertama-tama membuat objek User baru berdasarkan data yang diberikan oleh pengguna dalam permintaan (username, email, dan password). Password di-hash menggunakan bcrypt.hashSync sebelum disimpan ke database.
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) { 
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id); //Jika pengguna mengirim data roles (peran) dalam permintaan, maka fungsi ini akan mencari roles yang sesuai dengan data roles yang diberikan dan menyimpannya sebagai daftar _id role dalam user.roles.
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => { // setelah mengatur roles, fungsi ini akan menyimpan data pengguna ke database menggunakan user.save(). Jika ada kesalahan, fungsi akan mengirimkan respons dengan kode status 500 (Internal Server Error) dan pesan kesalahan. Jika berhasil, fungsi akan mengirimkan respons dengan kode status 200 (OK) dan pesan sukses.
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.login = (req, res) => { //Ini adalah fungsi untuk menangani proses login pengguna.
  User.findOne({ //Fungsi ini mencari pengguna berdasarkan username yang diberikan dalam permintaan menggunakan User.findOne().
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) { //Jika pengguna tidak ditemukan, fungsi akan mengirimkan respons dengan kode status 404 (Not Found) dan pesan "User Not found".
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync( //Jika pengguna ditemukan, fungsi akan memverifikasi password yang diberikan dalam permintaan dengan password yang disimpan di database menggunakan bcrypt.compareSync. Jika password cocok, maka fungsi akan menghasilkan token JWT (JSON Web Token) menggunakan jwt.sign(). Token ini akan digunakan sebagai tanda bahwa pengguna berhasil login.
        req.body.password,
        user.password
      );

      if (!passwordIsValid) { 
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) { // Fungsi juga akan menyusun daftar peran (roles) pengguna dalam bentuk array berisi nama peran dengan format "ROLE_" + namaPeran.toUpperCase().
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token; //  fungsi menyimpan token dalam session menggunakan req.session.token.

      res.status(200).send({ // fungsi mengirimkan respons dengan kode status 200 (OK) dan data pengguna (id, username, email, dan roles).
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

// kode diatas merupakan bagian dari server backend yang bertanggung jawab untuk proses registrasi dan login pengguna dalam aplikasi. Selain itu, kode ini menggunakan JWT untuk menghasilkan token yang akan digunakan untuk mengotentikasi pengguna dalam permintaan selanjutnya.
