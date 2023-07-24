const APIURL = "https://6350c1a178563c1d82c78809.mockapi.io/user"; // menyimpan URL dari mock API yang digunakan untuk menyimpan data pengguna (user).

let loginForm= document.querySelector("#login") // Mengambil elemen form dengan ID "login" dan menyimpannya dalam variabel loginForm.
let inputemail = document.querySelector('#email')// Mengambil elemen input dengan ID "email" dan "password" dan menyimpannya dalam variabel inputemail dan inputPassword.
let inputPassword = document.querySelector('#password')
getData(APIURL); // Memanggil fungsi getData() dengan APIURL sebagai argumen untuk mengambil data dari mock API.
async function getData(APIURL){ //Fungsi async untuk mengambil data dari API menggunakan fetch dan mengolah responsenya.
  const response = await fetch(APIURL); //Menggunakan fetch untuk mengambil data dari APIURL secara asynchronous dan menunggu hingga data diambil sebelum melanjutkan eksekusi kode selanjutnya.
  const responseData = await response.json(); // Mengubah respons dari API menjadi objek JavaScript dengan menggunakan metode .json() dan menyimpannya dalam variabel responseData.
  console.log(responseData) // Menampilkan data yang diambil dari API ke konsol.
  responseData.forEach(item => { // Melakukan iterasi untuk setiap objek (item) dalam array responseData dan memanggil fungsi showData(item) untuk menampilkan data tersebut.
    showData(item)
  })
  function showData(data){ //  Ini adalah fungsi yang digunakan untuk menampilkan data dan menangani proses login.
    loginForm.addEventListener("submit", (Event =>{ // Menambahkan event listener pada form dengan ID "login". Ketika form di-submit (tombol login ditekan), fungsi anonim yang berisi logika untuk proses login akan dijalankan.
      Event.preventDefault() // Menghentikan perilaku default dari form saat tombol submit ditekan untuk mencegah halaman refresh.
      
      let userLogin = { // Membuat objek userLogin yang berisi nilai email dan password yang diisi oleh pengguna di form.
        email:inputemail.value,
        password:inputPassword.value
      }

      let signin = userLogin.email == data.email && // Membandingkan data yang diisi oleh pengguna (userLogin) dengan data pengguna yang diambil dari API (data). Jika email dan password cocok, variabel signin akan bernilai true, jika tidak cocok, akan bernilai false.
                  userLogin.password == data.password;

                  if (signin){ // Melakukan pengecekan apakah proses login berhasil atau tidak. Jika berhasil (nilai signin adalah true), pengguna akan diarahkan ke halaman "dampak.html" menggunakan window.location.href.
                    window.location.href="dampak.html"
                  } else {
                    
                    alert("Email dan Password anda salah") // Jika proses login gagal (nilai signin adalah false), akan muncul pesan peringatan "Email dan Password anda salah" menggunakan alert().
                  }
    }))
  }
}

