# [NAMA LENGKAP] — Personal Portfolio

Website portfolio pribadi 3D premium, futuristik, glassmorphism, dan fully responsive.
Dibuat sebagai **1 file HTML tunggal** (`index.html`) — tidak butuh build tool, tidak butuh Node.js, langsung bisa di-deploy.

## 🚀 Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `nama-portfolio`.
2. Upload semua file di folder ini (`index.html`, folder `assets/`) ke repository tersebut.
   - Bisa lewat GitHub web ("Add file → Upload files"), atau lewat git:
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/USERNAME/nama-portfolio.git
     git push -u origin main
     ```
3. Di repository, buka **Settings → Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit. Website akan aktif di:
   `https://USERNAME.github.io/nama-portfolio/`

Tidak perlu setting tambahan apa pun — file `index.html` sudah lengkap dengan CSS & JS di dalamnya.

## ✏️ Cara Mengganti Data Pribadi

Semua data yang perlu diganti ditandai dengan `[TANDA KURUNG]` di dalam `index.html`. Cukup buka file dengan text editor (VS Code, Notepad, dll), lalu `Find & Replace`:

| Placeholder | Ganti dengan |
|---|---|
| `[NAMA LENGKAP]` | Nama lengkap Anda |
| `[NAMA PANGGILAN]` | Nama panggilan |
| `[PROFESI]` | Profesi / role Anda |
| `[TEMPAT]`, `[TANGGAL LAHIR]` | Tempat & tanggal lahir |
| `[KOTA / NEGARA]` | Domisili |
| `[EMAIL]` | Alamat email |
| `[NOMOR]` | Nomor WhatsApp (format `62xxxxxxxxxx` untuk link WhatsApp) |
| `[USERNAME]` | Username tiap platform sosial media |
| `[TAHUN]`, `[POSISI]`, `[PERUSAHAAN]`, dst | Isi timeline & pengalaman kerja |

**Hapus baris `social-card` untuk platform yang tidak Anda pakai** (cari section `<!-- SOCIAL -->`).

## 🖼️ Mengganti Foto Profil

- Ganti file `assets/profile-photo.jpg` dengan foto Anda sendiri (gunakan nama file yang sama, atau ubah path di `<img src="assets/profile-photo.jpg">` pada bagian `<!-- ABOUT -->`).
- Untuk foto project, tambahkan gambar ke `assets/` lalu ganti div `.project-thumb` dengan tag `<img>`.
- Favicon & og-image opsional — tambahkan file `assets/favicon.png` dan `assets/og-image.jpg` jika ingin custom.

## ⚙️ Fitur

- Dark/Light mode (tersimpan otomatis di browser)
- Custom cursor (desktop), otomatis nonaktif di mobile
- 3D hero object dengan mouse parallax
- Particle background ringan, otomatis dikurangi di device low-end / layar kecil
- Scroll reveal animation di setiap section
- Timeline perjalanan, skill bar animasi, project cards 3D hover
- Form kontak dengan validasi + tombol WhatsApp & Email langsung
- Mendukung `prefers-reduced-motion` untuk aksesibilitas
- SEO meta tags, Open Graph, Twitter Card sudah disiapkan

## 📱 Responsive

Sudah dites secara struktural untuk breakpoint: Desktop 1920/1440px, Laptop 1366px, Tablet, dan Mobile (Android/iPhone) — navbar otomatis berubah jadi hamburger menu di layar kecil.

---
Silakan edit sesuka hati — semua warna & font diatur lewat CSS variables di bagian atas `<style>` (`:root`) supaya mudah dikustomisasi.
