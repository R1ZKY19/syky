# Our Story — Private Couple Website

Website pasangan privat: hero dengan live counter, galeri foto, timeline "Our Story",
love letter, memories dengan filter tahun, special dates + countdown, music player,
interactive hearts, secret message, dark/light mode, dan gerbang password sederhana.

Ini adalah **website statis** (HTML/CSS/JS murni) — tanpa perlu install apa pun,
tanpa server, tanpa database. Bisa langsung dibuka di browser atau di-hosting gratis.

## 🚀 Cara Menjalankan

**Cara tercepat:** klik dua kali `index.html` — langsung terbuka di browser.

Password default: **`ourstory`**

**Cara yang lebih rapi (disarankan):** jalankan lewat local server supaya semua
fitur (termasuk foto & musik) berjalan sempurna:

```bash
# di dalam folder couple-site/
python3 -m http.server 8000
# lalu buka http://localhost:8000 di browser
```

## ✏️ Cara Mengedit Konten

**Semua konten diatur dari satu file: `config.js`**

Buka file itu dengan text editor (Notepad, VS Code, dsb), lalu ubah:

| Bagian di config.js     | Untuk mengubah                                  |
|--------------------------|--------------------------------------------------|
| `gate`                    | Password masuk & hint-nya                       |
| `names`                   | Nama kalian berdua & tagline                    |
| `relationshipStart`       | Tanggal mulai hubungan (untuk live counter)      |
| `gallery`                 | Foto-foto di section Gallery                     |
| `timeline`                | Perjalanan hubungan (First Meet → Today)         |
| `loveLetter`              | Isi surat cinta                                  |
| `memories`                | Kartu-kartu kenangan (bisa difilter per tahun)   |
| `specialDates`            | Anniversary, ulang tahun, dll + countdown        |
| `music`                   | Lagu yang diputar di music player                |
| `secretMessage`           | Pesan rahasia di tombol "OPEN SECRET"            |

Setelah menyimpan `config.js`, tinggal **refresh halaman** — tidak perlu build/compile apa pun.

## 🖼️ Mengganti Foto

1. Taruh file foto kamu di folder `assets/photos/`
2. Di `config.js`, ubah `src: "assets/photos/photo-1.jpg"` menjadi nama file kamu
3. Selama foto belum diganti, akan otomatis tampil placeholder elegan bertuliskan
   "Ganti foto ini di config.js" — jadi tidak akan pernah muncul foto orang lain / stok.

## 🎵 Mengganti Musik

1. Taruh file `.mp3` di folder `assets/music/`
2. Ubah `music.src` di `config.js` ke nama file tersebut
3. Musik **tidak akan autoplay** — baru main setelah pengguna klik tombol play (sesuai kebiasaan browser & permintaan awal).

## 🔒 Mengganti Password Gerbang

Password disimpan dalam bentuk hash (SHA-256), bukan teks biasa. Caranya:

1. Buka website di browser → tekan `F12` → tab **Console**
2. Ketik: `await sha256("password_baru_kamu")` lalu Enter
3. Salin hasil hash yang muncul, tempel ke `gate.passwordHash` di `config.js`

> Catatan jujur: ini adalah proteksi "sopan-sopanan" di sisi browser (client-side),
> bukan keamanan tingkat produksi. Siapa pun yang cukup teknis bisa melihat kode
> sumbernya. Untuk perlindungan sungguh-sungguh (login server + database), dibutuhkan
> backend seperti Laravel + MySQL yang harus di-deploy ke server sendiri — beri tahu
> saya kalau kamu mau saya bantu buatkan versi itu.

## 🌐 Cara Hosting (supaya bisa dibuka dari HP pasangan)

Pilihan termudah & gratis:

- **Netlify Drop** — buka https://app.netlify.com/drop, drag & drop folder ini
- **Vercel** — `vercel deploy` dari dalam folder ini (butuh akun)
- **GitHub Pages** — push folder ini ke repo GitHub, aktifkan Pages di Settings

Setelah live, kamu dapat link seperti `https://ourstory-xxxx.netlify.app` yang bisa dikirim ke pasangan.

## 📁 Struktur Folder

```
couple-site/
├── index.html          ← struktur halaman
├── config.js            ← SATU-SATUNYA file yang perlu kamu edit untuk konten
├── css/style.css        ← styling (tidak perlu diedit kecuali mau ubah desain)
├── js/main.js           ← logic/interaktivitas (tidak perlu diedit)
├── assets/photos/       ← taruh foto-foto kalian di sini
└── assets/music/        ← taruh file musik di sini
```

## 🛠️ Tentang Versi Laravel + MySQL

Permintaan awal menyebut opsi Laravel + MySQL + admin panel dengan database & auth
sungguhan. Versi statis ini sengaja dipilih sebagai hasil pertama karena:

- Bisa langsung jalan tanpa server/database — buka & pakai hari ini juga
- Semua fitur inti (counter, galeri, timeline, love letter, memories, special dates,
  music player, secret message, dark mode, gerbang password) sudah lengkap berfungsi
- Mengedit konten cukup lewat satu file `config.js`, tidak perlu login admin/database

Kalau nanti kamu memang butuh versi dengan akun login sungguhan, database MySQL,
dan panel admin berbasis web (bukan edit file), itu jenis proyek Laravel penuh yang
perlu di-deploy ke hosting/VPS sendiri (butuh PHP, MySQL, composer, dsb) — saya bisa
bantu buatkan strukturnya kalau kamu mau lanjut ke arah situ.
