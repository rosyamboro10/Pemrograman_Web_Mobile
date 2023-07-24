const { authJwt } = require("../middlewares"); // Mengimpor modul authJwt dari direktori "../middlewares". Modul ini berisi fungsi-fungsi middleware untuk mengelola otentikasi dan otorisasi pengguna menggunakan JSON Web Token (JWT).
const controller = require("../controllers/user.controller"); // Mengimpor modul controller dari direktori "../controllers/user.controller". Modul ini berisi fungsi-fungsi untuk mengontrol logika bisnis pada rute-rute yang terkait dengan pengguna (user).

module.exports = function(app) { // Mendefinisikan fungsi middleware yang menerima objek app sebagai parameter. Fungsi ini digunakan untuk mengatur rute-rute dalam aplikasi.
  app.use(function(req, res, next) { // Middleware ini menambahkan header "Access-Control-Allow-Headers" pada setiap respons yang akan dikirimkan oleh server. Header ini memungkinkan akses dari domain lain (Cross-Origin Resource Sharing/CORS) untuk mengakses sumber daya server dengan metode tertentu. Dalam hal ini, header yang ditambahkan adalah "Origin, Content-Type, Accept". Fungsi next() dipanggil untuk melanjutkan eksekusi ke middleware atau pemroses berikutnya dalam stack middleware.
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
};
