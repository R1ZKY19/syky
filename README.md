# Undangan Pernikahan — Sisy Syafira & Rizky Prayogi

Website undangan pernikahan tema India: hero animasi, efek hati jatuh (falling
hearts), hitung mundur, personalisasi nama tamu lewat link, RSVP, dan galeri.
Satu file HTML saja (`index.html`) — tidak perlu proses build apa pun.

## Struktur folder

```
wedding-site/
├── index.html        ← seluruh halaman (HTML+CSS+JS jadi satu)
└── assets/
    ├── music.mp3      ← taruh file musik kamu di sini (nama file harus "music.mp3")
    ├── sisy.jpg        ← foto mempelai wanita (opsional)
    ├── rizky.jpg       ← foto mempelai pria (opsional)
    └── foto1.jpg ...   ← foto galeri (opsional)
```

## Apa saja yang perlu diganti

Buka `index.html`, cari komentar `<!-- GANTI ... -->` — semua ada di:
- Tanggal & waktu (hero, countdown, kartu acara) — juga baris
  `var targetDate = new Date('2026-12-12T08:00:00');` di bagian `<script>`
- Alamat lokasi akad & resepsi + link Google Maps (atribut `href="#"` pada `.map-btn`)
- Nama orang tua kedua mempelai
- Foto: ganti `<svg>...</svg>` placeholder dengan `<img src="assets/nama-file.jpg">`
- Nomor rekening & nama bank di bagian "Kirim Hadiah"
- Isi cerita cinta di bagian "Kisah Kami"

## Musik

Kamu yang mengatur musiknya sendiri — cukup taruh file audio (mp3) di
`assets/music.mp3`. Tombol bulat di pojok kanan bawah untuk play/pause.
Musik otomatis mencoba diputar saat tombol "Buka Undangan" ditekan (browser
tetap bisa memblokir autoplay tanpa interaksi, tapi karena ini dipicu oleh
klik tombol, umumnya berhasil).

## Personalisasi nama tamu

Tambahkan `?to=Nama%20Tamu` di akhir URL saat membagikan link, misalnya:

```
https://namakamu.github.io/wedding-site/?to=Bapak%20Andi
```

Nama tamu otomatis muncul di layar pembuka.

## RSVP

Form RSVP saat ini hanya tampilan depan (front-end) — mengetik dan mengirim
akan menampilkan pesan terima kasih, tapi datanya belum tersimpan ke mana pun.
Untuk menyimpan data sungguhan, pilih salah satu:
- Hubungkan ke [Google Form](https://forms.google.com) (ganti form RSVP dengan embed Google Form),
- atau gunakan layanan seperti Formspree / Getform (tambahkan `action` pada tag `<form>`).

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `wedding-sisy-rizky`.
2. Upload `index.html` dan folder `assets/` ke repository tersebut
   (lewat web GitHub: "Add file" → "Upload files", atau lewat terminal):
   ```
   git init
   git add .
   git commit -m "Undangan pernikahan Sisy & Rizky"
   git branch -M main
   git remote add origin https://github.com/USERNAME/wedding-sisy-rizky.git
   git push -u origin main
   ```
3. Di repository GitHub, buka **Settings → Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, situs akan aktif di:
   ```
   https://USERNAME.github.io/wedding-sisy-rizky/
   ```

Selesai — tinggal bagikan link tersebut (bisa ditambah `?to=Nama` untuk tiap tamu).
