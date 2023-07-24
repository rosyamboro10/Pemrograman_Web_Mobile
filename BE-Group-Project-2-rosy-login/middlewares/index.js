const authJwt = require("./authJwt"); // Mengimpor modul authJwt dari berkas "./authJwt". Modul ini berisi fungsi-fungsi middleware untuk mengelola otentikasi dan otorisasi pengguna menggunakan JSON Web Token (JWT).
const verifyRegister = require("./verifyRegister"); // Mengimpor modul 

module.exports = { // Mendefinisikan objek yang akan diekspor oleh modul ini.
  authJwt, // Menambahkan objek authJwt dan verifyRegister ke dalam objek yang akan diekspor.
  verifyRegister
};
