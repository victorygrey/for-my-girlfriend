# 💖 Untuk Pacarku (A Little Romantic Adventure)

Sebuah project website sederhana, interaktif, dan manis yang dirancang khusus sebagai kado digital untuk pacar tercinta. Project ini berisi kuis hubungan, pencarian "harta karun" berupa potongan pesan manis, dan surat rahasia yang terkunci.

---

## ✨ Fitur Utama

1. **Polaroid Memory Stack**
   * Tumpukan foto polaroid estetik di halaman depan yang menampilkan kenangan favorit.
   * **Foto Interaktif**: Setiap foto polaroid bisa diklik untuk melihat pratinjau (*preview*) berukuran besar beserta teks keterangannya secara detail.
2. **Autoplay Background Music**
   * Memutar lagu latar secara otomatis saat website dibuka (atau pada interaksi/klik pertama jika diblokir browser).
   * Pemutaran disetel **hanya 1 kali** (tidak berulang/loop) untuk nuansa yang lebih sinematik.
   * Dilengkapi tombol melayang (*floating widget*) piringan hitam yang berputar saat lagu aktif, dan dapat diklik untuk *play/pause*.
3. **Misi 1: Quiz Kita (Kuis Hubungan)**
   * Berisi 5 pertanyaan manis seputar hubungan kalian untuk mengumpulkan skor terbaik.
4. **Misi 2: Treasure Hunt (Pencarian Harta Karun)**
   * Menemukan 5 hati kecil tersembunyi yang lokasinya diacak secara dinamis. Setiap hati yang ditemukan membuka potongan pesan romantis.
5. **Misi 3: Unlock Message (Surat Rahasia)**
   * Sebuah surat cinta rahasia yang terkunci gembok. Surat ini hanya bisa dibuka dan dibaca setelah Misi 1 (Quiz) dan Misi 2 (Treasure Hunt) berhasil diselesaikan.

---

## 📂 Struktur File

* **[index.html](file:///d:/Project/for-my-girlfriend/index.html)** - Struktur dasar halaman, modal pratinjau foto, dan pemutar musik.
* **[style.css](file:///d:/Project/for-my-girlfriend/style.css)** - Desain visual premium (skema warna romantis, tumpukan polaroid, transisi hover, glassmorphism, dan tata letak responsif).
* **[script.js](file:///d:/Project/for-my-girlfriend/script.js)** - Logika permainan, pengacakan koordinat hati, modal lightbox foto, kontrol autoplay musik, dan manajemen state misi.
* **[image/](file:///d:/Project/for-my-girlfriend/image)** - Folder penyimpanan foto kenangan (`1.jpeg` s.d. `6.jpeg`).
* **[media/](file:///d:/Project/for-my-girlfriend/media)** - Folder penyimpanan file audio latar belakang (`song.mp3`).
* **[icon/](file:///d:/Project/for-my-girlfriend/icon)** - Folder penyimpanan favicon/ikon browser (`couple.png`).

---

## 🚀 Cara Menjalankan

### Cara 1: Buka Langsung (Offline)
Cukup klik ganda (*double click*) file **[index.html](file:///d:/Project/for-my-girlfriend/index.html)** untuk membukanya di browser favorit Anda.

### Cara 2: Menggunakan Local Server (Direkomendasikan)
Jika ingin memastikan semua fitur (seperti autoplay audio) berjalan maksimal tanpa hambatan keamanan lokal browser, jalankan server lokal sederhana:

**Menggunakan Python:**
```bash
python -m http.server 8000
```
Lalu buka alamat `http://localhost:8000` di browser Anda.

**Menggunakan Node.js / NPM:**
```bash
npx http-server
```

---

## 🌐 Cara Deploy (Hosting Online)
Agar pacar Anda bisa membukanya langsung dari handphone atau perangkat mana saja, Anda bisa mengunggah project ini secara gratis ke layanan hosting static seperti:
* **GitHub Pages** (Tinggal push folder ke repository GitHub dan aktifkan GitHub Pages di settings).
* **Vercel** atau **Netlify** (Tinggal drag and drop folder project).
