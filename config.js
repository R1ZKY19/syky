/* ============================================================
   CONFIG.JS — SATU-SATUNYA FILE YANG PERLU KAMU EDIT
   ============================================================
   Ganti semua nilai di bawah ini sesuai dengan data kamu & pasangan.
   Setelah edit, simpan file ini lalu refresh halaman website.
   JANGAN edit file lain (style.css / main.js) kecuali kamu memang
   ingin mengubah desain/logic-nya.
   ============================================================ */

const COUPLE_CONFIG = {

  // ------------------------------------------------------------
  // 1. GERBANG (LOGIN SEDERHANA)
  // ------------------------------------------------------------
  // Ini BUKAN keamanan tingkat bank — hanya "pintu sopan" supaya
  // orang random yang dapat link tidak langsung lihat isinya.
  // Password TIDAK disimpan sebagai teks biasa, tapi di-hash (SHA-256).
  // Cara ganti password:
  //   1. Buka website ini di browser, tekan F12 > tab Console
  //   2. Ketik: await sha256("password_baru_kamu")
  //   3. Tempel hasilnya (huruf-angka panjang) ke passwordHash di bawah
  gate: {
    enabled: true,
    // hash default untuk password: "ourstory"
    passwordHash: "3529b5bf7eb01b6e2d63f3736dc30d2086cceab33b88ff7d9841fb28fd989b90",
    hint: "Password yang cuma kita berdua tahu 💜",
  },

  // ------------------------------------------------------------
  // 2. IDENTITAS PASANGAN
  // ------------------------------------------------------------
  names: {
    person1: "Rafi",
    person2: "Alya",
    tagline: "Two people, one story, countless memories.",
  },

  // Tanggal mulai hubungan — dipakai untuk live counter di hero
  // Format: "YYYY-MM-DDTHH:mm:ss"
  relationshipStart: "2023-08-17T18:00:00",

  // ------------------------------------------------------------
  // 3. FOTO GALERI ("FOTO KAMI")
  // ------------------------------------------------------------
  // Taruh file foto kamu di folder assets/photos/ lalu tulis nama
  // filenya di sini. Selama belum diganti, akan tampil placeholder.
  gallery: [
    { src: "assets/photos/photo-1.jpg", caption: "Sore itu, di tepi pantai" },
    { src: "assets/photos/photo-2.jpg", caption: "Ulang tahunmu yang ke-23" },
    { src: "assets/photos/photo-3.jpg", caption: "Ngopi sambil ketawa gak jelas" },
    { src: "assets/photos/photo-4.jpg", caption: "Liburan pertama kita" },
    { src: "assets/photos/photo-5.jpg", caption: "Random selfie di mobil" },
    { src: "assets/photos/photo-6.jpg", caption: "Malam tahun baru" },
  ],

  // ------------------------------------------------------------
  // 4. OUR STORY (TIMELINE)
  // ------------------------------------------------------------
  // Tambah/kurangi objek di array ini sesuka kamu — urutan otomatis
  // mengikuti urutan array (dari atas ke bawah).
  timeline: [
    {
      date: "2 Januari 2023",
      title: "First Meet",
      photo: "assets/photos/timeline-1.jpg",
      story: "Pertama kali ketemu di acara kampus, gak nyangka bakal jadi seperti ini.",
    },
    {
      date: "15 Januari 2023",
      title: "First Chat",
      photo: "assets/photos/timeline-2.jpg",
      story: "Chat pertama cuma basa-basi, tapi ternyata gak berhenti sampai sekarang.",
    },
    {
      date: "3 Maret 2023",
      title: "First Date",
      photo: "assets/photos/timeline-3.jpg",
      story: "Ngopi sore yang berubah jadi ngobrol sampai kafe mau tutup.",
    },
    {
      date: "17 Agustus 2023",
      title: "Official",
      photo: "assets/photos/timeline-4.jpg",
      story: "Hari saat kita sama-sama bilang 'iya, kita jalan bareng aja'.",
    },
    {
      date: "10 Desember 2023",
      title: "First Trip",
      photo: "assets/photos/timeline-5.jpg",
      story: "Liburan pertama berdua, banyak drama tapi banyak ketawa juga.",
    },
    {
      date: "Sekarang",
      title: "Today",
      photo: "assets/photos/timeline-6.jpg",
      story: "Masih di sini, masih milih kamu, setiap hari.",
    },
  ],

  // ------------------------------------------------------------
  // 5. LOVE LETTER
  // ------------------------------------------------------------
  loveLetter: {
    heading: "For You",
    signature: "— Yang selalu sayang kamu",
    body: `Aku gak pernah pandai merangkai kata, tapi untukmu aku mau coba.

Terima kasih sudah bertahan denganku, di hari-hari baik maupun yang berantakan. Terima kasih sudah jadi rumah, bahkan di saat aku sendiri belum tahu arah pulang.

Semoga cerita kita masih panjang, dan semoga setiap babnya selalu ada kamu di dalamnya.

Aku sayang kamu, sekarang dan nanti.`,
  },

  // ------------------------------------------------------------
  // 6. OUR MEMORIES
  // ------------------------------------------------------------
  memories: [
    {
      year: 2023,
      date: "17 Agustus 2023",
      title: "First Date",
      photo: "assets/photos/memory-1.jpg",
      description: "Hari itu bukan sekadar hari biasa. Jadi salah satu kenangan yang gak ingin aku lupakan.",
    },
    {
      year: 2023,
      date: "10 Desember 2023",
      title: "Liburan Pertama",
      photo: "assets/photos/memory-2.jpg",
      description: "Kita tersesat, kehujanan, tapi tetap ketawa. Itu yang bikin liburan ini beda.",
    },
    {
      year: 2024,
      date: "14 Februari 2024",
      title: "Valentine Pertama",
      photo: "assets/photos/memory-3.jpg",
      description: "Gak butuh perayaan besar, cukup makan malam sederhana bareng kamu.",
    },
    {
      year: 2024,
      date: "17 Agustus 2024",
      title: "Anniversary 1 Tahun",
      photo: "assets/photos/memory-4.jpg",
      description: "Satu tahun berlalu, dan aku masih memilihmu berkali-kali.",
    },
  ],

  // ------------------------------------------------------------
  // 7. SPECIAL DATES
  // ------------------------------------------------------------
  // type dipakai untuk memilih ikon: anniversary | birthday | firstdate | trip | firstchat
  specialDates: [
    { type: "anniversary", label: "Anniversary", date: "2026-08-17" },
    { type: "birthday", label: "Ulang Tahun Alya", date: "2026-09-25" },
    { type: "birthday", label: "Ulang Tahun Rafi", date: "2027-01-12" },
    { type: "firstdate", label: "First Date", date: "2023-03-03" },
    { type: "trip", label: "First Trip", date: "2023-12-10" },
    { type: "firstchat", label: "First Chat", date: "2023-01-15" },
  ],

  // ------------------------------------------------------------
  // 8. MUSIC PLAYER
  // ------------------------------------------------------------
  // Taruh file musik di assets/music/ lalu ganti nama file & judulnya.
  music: {
    src: "assets/music/our-song.mp3",
    title: "Our Song",
    artist: "Ganti dengan nama lagu favorit kalian",
  },

  // ------------------------------------------------------------
  // 9. SECRET MESSAGE
  // ------------------------------------------------------------
  secretMessage: {
    buttonLabel: "OPEN SECRET",
    unlockPassword: "", // kosongkan "" jika tidak mau pakai password tambahan
    message: `Kalau suatu hari kita lagi berantem dan kamu baca ini lagi...

Aku cuma mau bilang, aku masih mau di sini. Masih mau berusaha buat kita. Ayo kita selesaikan bareng-bareng, ya. 🤍`,
  },
};
