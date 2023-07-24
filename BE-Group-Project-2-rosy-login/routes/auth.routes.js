const { verifyRegister } = require("../middlewares"); // Mengimpor modul verifyRegister dari direktori "../middlewares". Modul ini berisi fungsi-fungsi middleware untuk melakukan verifikasi data pada proses registrasi pengguna.
const controller = require("../controllers/auth.controller"); // Mengimpor modul controller dari direktori "../controllers/auth.controller". Modul ini berisi fungsi-fungsi untuk mengontrol logika bisnis pada proses otentikasi (registrasi dan login).

module.exports = function(app) { // Mendefinisikan fungsi middleware yang menerima objek app sebagai parameter. Fungsi ini digunakan untuk mengatur rute-rute dalam aplikasi.
  app.use(function(req, res, next) { // Middleware ini menambahkan header "Access-Control-Allow-Headers" pada setiap respons yang akan dikirimkan oleh server. Header ini memungkinkan akses dari domain lain (Cross-Origin Resource Sharing/CORS) untuk mengakses sumber daya server dengan metode tertentu. Dalam hal ini, header yang ditambahkan adalah "Origin, Content-Type, Accept". Fungsi next() dipanggil untuk melanjutkan eksekusi ke middleware atau pemroses berikutnya dalam stack middleware.
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( // Mendefinisikan rute POST "/api/auth/register" untuk proses registrasi pengguna.
    "/api/auth/register",
    [
      verifyRegister.checkDuplicateUsernameOrEmail, // digunakan untuk memeriksa dan memvalidasi data yang diberikan saat registrasi pengguna. Middleware ini akan dieksekusi sebelum fungsi controller.register yang bertanggung jawab untuk melakukan proses registrasi pengguna.
      verifyRegister.checkRolesExisted
    ],
    controller.register // dijadikan sebagai pemroses (handler) untuk rute "/api/auth/register".
  );

  app.post("/api/auth/login", controller.login); // Mendefinisikan rute POST "/api/auth/login" untuk proses login pengguna.
  // 'controller.login' dijadikan sebagai pemroses (handler) untuk rute "/api/auth/login".
};
