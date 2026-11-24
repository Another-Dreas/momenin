# AGENTS.md: Momenin (Versi Demo HTML/CSS/JS)

Dokumen ini adalah aturan kerja untuk AI agent yang membangun Momenin. Baca sekali di awal, lalu patuhi. Dokumen ini sengaja dibuat ringkas agar hemat token.

**Versi:** 2.0
**Status:** Aktif. Menggantikan versi 1.1 yang berbasis Next.js.
**Bahasa UI dan dokumentasi:** Bahasa Indonesia.

---

## 1. Tujuan Versi Ini

Membangun **website demo Momenin** yang:

1. Dibuat dengan **HTML, CSS, dan JavaScript murni**. Tidak memakai framework, build tool, atau package manager.
2. Memiliki seluruh halaman publik, area pelanggan, dan area admin.
3. Memiliki **login demo**. Pengguna dapat masuk sebagai pelanggan atau admin, tetapi tidak ada autentikasi nyata.
4. Menampilkan **tampilan berbeda setelah login**: navigasi, CTA, dan halaman yang tersedia mengikuti role.
5. Memiliki tampilan **elegan, profesional, hangat, dan berorientasi foto**.
6. Dapat dibuka langsung di browser atau di-hosting sebagai file statis.

**Di luar cakupan:** database, backend, autentikasi nyata, pembayaran, email, upload ke cloud, dan Google OAuth.

---

## 2. Prinsip Hemat Token

- Jangan menulis ulang file yang tidak berubah. Ubah hanya bagian yang perlu.
- Jangan menyalin header, footer, atau sidebar ke setiap halaman. Gunakan `js/layout.js`.
- Jangan membuat dependency baru. Tanpa npm, bundler, atau framework.
- Jangan menulis komentar panjang. Komentar hanya untuk hal yang tidak jelas dari kode.
- Baca bagian berkas yang relevan saja, bukan seluruh berkas.
- Data demo ditulis sekali di `js/data.js`. Halaman tidak boleh membuat data demo sendiri.
- Gunakan satu stylesheet dan satu file JS inti. JS per halaman dibuat sekecil mungkin.
- Laporan singkat sesuai bagian 13.

---

## 3. Stack

| Bagian | Pilihan |
|---|---|
| Markup | HTML5 semantik |
| Styling | CSS biasa dengan CSS variables |
| Script | JavaScript ES2020 modern, tanpa TypeScript |
| Ikon | SVG inline sederhana. Tanpa library ikon |
| Font | Google Fonts boleh dimuat, dengan fallback sistem |
| Build | Tidak ada |
| Penyimpanan demo | `localStorage` dengan kunci `momenin_demo_v1` (khusus demo) |
| Hosting | Statis |

`localStorage` hanya untuk data demo dan sesi demo. Password tidak pernah disimpan di sana (lihat 5.6).

---

## 4. Struktur Folder

```text
momenin/
├── index.html                 # Beranda
├── tentang.html
├── layanan.html
├── layanan-detail.html        # Memakai ?slug=
├── portofolio.html
├── paket.html
├── kontak.html
├── login.html
├── register.html
├── lupa-password.html
├── kebijakan-privasi.html
├── syarat-ketentuan.html
├── app/                       # Area pelanggan (wajib login user)
│   ├── dashboard.html
│   ├── proyek.html
│   ├── proyek-detail.html     # Memakai ?id=
│   ├── album.html
│   ├── album-detail.html      # Memakai ?id=
│   ├── penyimpanan.html
│   ├── paket-saya.html
│   ├── transaksi.html
│   ├── pemesanan.html
│   └── profil.html
├── admin/                     # Area admin (wajib login admin)
│   ├── index.html
│   ├── pelanggan.html
│   ├── proyek.html
│   ├── proyek-detail.html     # Memakai ?id=
│   ├── album.html
│   ├── media.html
│   ├── layanan.html
│   ├── paket.html
│   ├── langganan.html
│   ├── pembayaran.html
│   ├── pemesanan.html
│   ├── aktivitas.html
│   └── pengaturan.html
├── css/
│   └── style.css              # Satu-satunya stylesheet
├── js/
│   ├── data.js                # Seed data demo dan konfigurasi harga
│   ├── store.js               # Baca dan tulis data demo, reset
│   ├── auth.js                # Login demo, logout, sesi, guard halaman
│   ├── layout.js              # Render header dan footer sesuai role
│   ├── ui.js                  # Toast, dialog konfirmasi, format Rupiah, format tanggal, escapeHtml
│   └── pages/                 # JS kecil per halaman (opsional)
├── assets/
│   └── img/                   # Gambar legal atau placeholder
├── README.md
└── AGENTS.md
```

**Aturan folder:**

- Setiap halaman memuat, berurutan: `css/style.css`, `js/data.js`, `js/store.js`, `js/auth.js`, `js/ui.js`, `js/layout.js`, lalu skrip halaman jika ada.
- Halaman di `app/` memanggil `requireLogin("user")`. Halaman di `admin/` memanggil `requireLogin("admin")`. Keduanya didefinisikan di `auth.js`.
- Halaman di `app/` dan `admin/` memakai `../` untuk mengakses aset dan halaman publik.

---

## 5. Akun Demo dan Login

### 5.1 Akun Seed

| Role | Email | Password | Nama tampilan |
|---|---|---|---|
| user | `pelanggan@demo.momenin` | `demo1234` | Rara Pelanggan |
| user | `pasangan@demo.momenin` | `demo1234` | Dimas dan Sinta |
| admin | `admin@demo.momenin` | `admin1234` | Admin Momenin |

Password ini hanya untuk demo. Halaman login menampilkannya dalam kotak "Akun demo". Jangan menyebutnya sebagai kredensial nyata.

### 5.2 Perilaku Login

- Validasi format email dan panjang password di sisi klien.
- Pencocokan dilakukan terhadap akun seed di `data.js`, bukan terhadap data di `localStorage`.
- Jika cocok, simpan sesi:
  ```json
  { "userId": "usr-001", "role": "user" }
  ```
- Jika tidak cocok, tampilkan pesan error di bawah form. Field email tetap terisi, password dikosongkan.
- Tombol login menampilkan "Memproses..." dan nonaktif selama 600 ms.
- Setelah sukses, role `admin` diarahkan ke `admin/index.html`, role `user` ke `app/dashboard.html`.
- Jika ada `?next=`, arahkan ke sana, kecuali tujuannya halaman login atau register.

### 5.3 Registrasi Demo

- Field: nama, email, password, konfirmasi password, dan persetujuan syarat.
- Tidak ada pilihan role. Registrasi selalu membuat role `user`.
- Validasi: password minimal 8 karakter, konfirmasi harus sama, email belum terdaftar.
- Akun baru ditulis ke data demo tanpa field password. Setelah registrasi sukses, pengguna langsung punya sesi.
- Akun hasil registrasi tidak bisa login ulang di versi ini. Login dengan email tersebut menampilkan pesan: "Akun hasil registrasi hanya aktif pada sesi ini. Gunakan akun demo untuk masuk ulang."
- Tampilkan keterangan: "Registrasi ini hanya simulasi."

### 5.4 Lupa Password

Form email. Setelah submit, tampilkan: "Jika email terdaftar, tautan reset akan dikirim. (Simulasi, tidak ada email yang terkirim.)"

### 5.5 Logout

Hapus sesi, arahkan ke `index.html`, dan tampilkan notifikasi singkat.

### 5.6 Aturan Password

- Password seed hanya ada di `data.js`.
- Saat data demo ditulis ke `localStorage`, field `password` dibuang lebih dulu.
- Jangan pernah menulis password ke `localStorage`, `sessionStorage`, cookie, atau log.

---

## 6. Perbedaan Tampilan Sebelum dan Sesudah Login

Bagian ini wajib. Perbedaan dihasilkan oleh `renderLayout()` di `layout.js` dan `getSession()` di `auth.js`.

### 6.1 Navigasi Header

| Kondisi | Menu utama | Menu kanan |
|---|---|---|
| Belum login | Beranda, Tentang, Layanan, Portofolio, Paket, Kontak | Masuk dan Daftar (tombol) |
| User | Beranda, Layanan, Portofolio, Paket, Proyek saya, Album, Penyimpanan | Nama pengguna dengan menu: Dashboard, Profil, Keluar |
| Admin | Dashboard, Pelanggan, Proyek, Album, Media, Layanan, Paket, Langganan, Pembayaran, Pemesanan, Aktivitas, Pengaturan | Nama admin dengan menu: Lihat situs, Keluar |

Di bawah 900 px, menu utama menjadi tombol hamburger. Menu dapat ditutup dengan tombol Esc dan klik di luar.

### 6.2 Beranda

- Belum login: CTA utama "Ajukan layanan" dan CTA kedua "Daftar akun".
- User: CTA utama "Buka dashboard" dan CTA kedua "Ajukan layanan baru". Section "Proyek terbaru" tampil, berisi proyek milik user.
- Admin: CTA utama "Buka dashboard admin". Section proyek user tidak tampil.

### 6.3 Halaman Publik Lain

- `paket.html`, `layanan.html`, dan `portofolio.html` dapat diakses semua role.
- Tombol "Ajukan" pada paket: jika user login, membuka `app/pemesanan.html` dengan paket terpilih dan data profil terisi. Jika belum login, membuka `login.html?next=...`.
- Admin melihat tombol "Ajukan" yang sama. Admin tidak dapat mengajukan layanan atas nama pelanggan dari halaman publik.

### 6.4 Login dan Register

Jika sudah login, membuka `login.html` atau `register.html` mengarahkan ke dashboard sesuai role.

### 6.5 Guard Area App dan Admin

- Tanpa sesi: redirect ke `login.html?next=<halaman>`.
- User membuka `admin/*`: redirect ke `app/dashboard.html` dengan notifikasi "Anda tidak memiliki akses ke area admin."
- Admin membuka `app/*`: diizinkan, dan header menampilkan badge "Mode admin".

---

## 7. Data Demo dan Store

### 7.1 Sumber dan API

- Seed ada di `js/data.js` sebagai `window.MOMENIN_SEED`.
- `js/store.js` menyediakan:
  - `getAll(entity)`, `getById(entity, id)`, `create(entity, obj)`, `update(entity, id, patch)`, `remove(entity, id)`
  - `resetDemo()` untuk kembali ke seed
- Data aktif disimpan di `localStorage["momenin_demo_v1"]`. Jika kunci belum ada, seed dipakai.
- Hanya `store.js` dan `auth.js` yang boleh menyentuh `localStorage`.
- Halaman lain hanya memanggil `store.*`.

### 7.2 Entitas

- `users`: `{ id, name, email, role, status, phone, createdAt }`. Field `password` hanya ada di seed (lihat 5.6).
- `services`: `{ id, slug, name, category, description, image, active }`
- `packages`: `{ id, serviceId, name, priceIdr, features[], isDemoPrice: true, active }`
- `requests`: `{ id, userId, customerName, email, phone, eventType, eventDate, eventLocation, packageId, notes, status, createdAt }`
- `projects`: `{ id, name, eventType, eventDate, location, status, memberIds[], createdAt }`
- `albums`: `{ id, projectId, name, description, coverMediaId }`
- `media`: `{ id, albumId, projectId, fileName, type, sizeBytes, image, sortOrder }`
- `storagePlans`: `{ id, name, quotaBytes, priceIdr, billingPeriod: "monthly", isDemoPrice: true, active }`
- `subscriptions`: `{ id, userId, planId, status, periodStart, periodEnd }`
- `payments`: `{ id, userId, orderId, amountIdr, status, createdAt, isDemo: true }`
- `folders`: `{ id, userId, parentId, name }`
- `files`: `{ id, userId, folderId, fileName, type, sizeBytes, createdAt }` (hanya metadata)
- `activity`: `{ id, actorId, action, entityType, entityId, createdAt }`

### 7.3 Aturan Data

- ID stabil ditulis manual di seed, misalnya `prj-001`. Jangan memakai nama sebagai ID.
- Tanggal berformat ISO 8601.
- Uang berupa integer Rupiah (`priceIdr`, `amountIdr`).
- Ukuran file dalam bytes.
- Relasi harus konsisten: album merujuk proyek yang ada, media merujuk album, transaksi merujuk user.
- Pemakaian storage dihitung dari `files` milik user, bukan angka hardcoded.
- `media` (dokumentasi proyek) tidak dihitung ke kuota `files`.

### 7.4 Jumlah Minimum Seed

- 3 user pelanggan dan 1 admin.
- 5 layanan dengan 3 paket dokumentasi.
- 4 paket storage.
- 5 proyek dengan status berbeda.
- 5 album dan minimal 12 media contoh.
- 3 langganan, 4 transaksi, 4 permintaan layanan.
- Folder dan file storage contoh untuk user Premium.

---

## 8. Harga Demo dan Kuota

Semua harga berasal dari `js/data.js`. Setiap tampilan harga wajib diberi label **"Harga demo"**.

### 8.1 Paket Dokumentasi (sekali bayar per acara)

| Paket | priceIdr | Isi contoh |
|---|---:|---|
| Mini | 300000 | Ulang tahun, acara keluarga kecil. 1 fotografer, sesi sampai 1 jam |
| Standar | 750000 | Wisuda, seminar, gathering. 1 fotografer, sesi sekitar 3 jam |
| Premium | 1500000 | Pernikahan, prewedding. Tim dokumentasi, sesi lebih panjang |

### 8.2 Paket Personal Storage (bulanan)

| Paket | priceIdr | quotaBytes | Upload |
|---|---:|---:|:---:|
| Free | 0 | 0 | Tidak |
| Basic | 9900 | 10737418240 (10 GB) | Ya |
| Plus | 19900 | 53687091200 (50 GB) | Ya |
| Pro | 39900 | 107374182400 (100 GB) | Ya |

GB dihitung sebagai GiB (1.024 x 1.024 x 1.024 bytes). Tampilkan satuan "GB" secara konsisten.

### 8.3 Batas Upload Demo

- Maksimum 50 MB per file. Ini batas demo, bukan batas produksi.
- Tipe diterima: `image/jpeg`, `image/png`, `image/webp`, `video/mp4`.
- Upload hanya menyimpan metadata. File asli tidak disimpan. Tampilkan keterangan ini di UI.

---

## 9. Halaman dan Perilaku

### 9.1 Publik

- **index.html**: hero, ringkasan layanan, alur kerja, preview paket, preview portofolio, FAQ, CTA. Mengikuti 6.2.
- **tentang.html**: penjelasan Momenin, nilai, dan cara kerja. Jangan mengarang sejarah perusahaan, alamat, jumlah tim, atau pengalaman tahunan.
- **layanan.html**: kartu layanan dengan filter kategori. Setiap kartu menuju `layanan-detail.html?slug=...`.
- **layanan-detail.html**: deskripsi, paket terkait, dan form permintaan singkat.
- **portofolio.html**: grid media contoh dengan filter kategori dan lightbox sederhana. Label "Contoh" wajib terlihat.
- **paket.html**: dua kelompok terpisah, paket dokumentasi dan paket storage. Label "Harga demo" di setiap kartu.
- **kontak.html**: form nama, email, dan pesan dengan validasi dan pesan sukses. Tidak mengirim apa pun.
- **kebijakan-privasi.html** dan **syarat-ketentuan.html**: teks draft dengan label "Draft, belum ditinjau ahli hukum."
- **lupa-password.html**: sesuai 5.4.

### 9.2 Area Pelanggan (`app/`)

- **dashboard.html**: sapaan, ringkasan proyek, album terbaru, status paket, pemakaian storage, transaksi terbaru.
- **proyek.html** dan **proyek-detail.html**: daftar dan detail proyek milik user, dengan status dan album terkait.
- **album.html** dan **album-detail.html**: grid media dan lightbox. Tombol unduh hanya menampilkan notifikasi "Unduhan hanya simulasi".
- **penyimpanan.html**: kapasitas, progress bar, daftar folder dan file, buat folder, upload simulasi, dan hapus file dengan konfirmasi. Untuk paket Free, tampilkan kartu ajakan upgrade dan nonaktifkan upload.
- **paket-saya.html**: paket aktif, status langganan, kuota, dan tombol upgrade simulasi.
- **transaksi.html**: tabel transaksi milik user dengan filter status.
- **pemesanan.html**: daftar permintaan milik user beserta statusnya, dan form permintaan baru.
- **profil.html**: ubah nama dan telepon (simulasi). Tombol ubah password hanya menampilkan notifikasi simulasi.

### 9.3 Area Admin (`admin/`)

- **index.html**: angka ringkasan dan aktivitas terbaru, dihitung dari store.
- **pelanggan.html**: tabel dengan pencarian dan filter status. Tanpa menampilkan password.
- **proyek.html**: tabel proyek, tombol buat proyek (dialog), dan filter status.
- **proyek-detail.html**: ubah detail, status, anggota, dan daftar album terkait.
- **album.html** dan **media.html**: kelola album, tambah dan hapus media contoh dengan konfirmasi.
- **layanan.html** dan **paket.html**: CRUD sederhana. Harga dan kuota diubah lewat store, tidak ditulis langsung di HTML.
- **langganan.html** dan **pembayaran.html**: tabel monitoring dengan filter. Tidak ada tombol refund atau aktivasi pembayaran nyata.
- **pemesanan.html**: daftar permintaan, ubah status, dan tombol "Jadikan proyek" yang membuat proyek baru di store.
- **aktivitas.html**: daftar aktivitas demo.
- **pengaturan.html**: nama situs, kontak demo, dan tombol reset data demo dengan konfirmasi.

### 9.4 State Wajib

Setiap halaman yang menampilkan data harus menangani:

- **Loading**: skeleton sederhana sekitar 300 ms.
- **Empty**: pesan dan ajakan tindakan.
- **Error**: pesan jelas di dekat area terkait.
- **Success**: toast singkat.
- **Confirm**: dialog untuk aksi hapus atau reset.

---

## 10. Desain Visual

### 10.1 Arah

Elegan, profesional, hangat, lapang, dan berorientasi foto. Hindari gradient ramai, glow, animasi berlebihan, dan tampilan dashboard template generik.

### 10.2 Warna (CSS variables di `style.css`)

```css
:root {
  --c-bg: #faf7f2;        /* ivory, latar utama */
  --c-surface: #ffffff;
  --c-ink: #1f1d1a;       /* teks utama */
  --c-muted: #6b655c;     /* teks sekunder */
  --c-line: #e7e1d6;      /* garis dan border */
  --c-accent: #8b6f47;    /* bronze, aksen utama */
  --c-accent-ink: #ffffff;
  --c-success: #3d6b4f;
  --c-warning: #a0701c;
  --c-danger: #9b3b33;
  --c-info: #3c5a78;
}
```

Gunakan variabel ini di semua komponen. Jangan menulis kode warna mentah di HTML atau JS. Kontras teks memenuhi WCAG AA.

### 10.3 Tipografi

- Heading: serif elegan, misalnya Cormorant Garamond. Fallback: `Georgia, "Times New Roman", serif`.
- Body dan UI: sans-serif bersih, misalnya Inter. Fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- Body 16 px dengan line-height 1.6.
- Maksimal dua keluarga font.

### 10.4 Layout

- Container maksimal 1200 px. Padding samping 20 px di mobile dan 40 px di desktop.
- Jarak antar section 88 px di desktop dan 56 px di mobile.
- Border radius 10 px untuk kartu, 999 px untuk pill dan tombol kecil.
- Bayangan sangat tipis atau tanpa bayangan dengan border tipis.
- Dashboard: sidebar 248 px di desktop, drawer di bawah 900 px.
- Tabel di mobile menjadi kartu atau scroll horizontal di dalam kontainernya sendiri.

### 10.5 Foto dan Media

- Dilarang mengambil foto dari internet tanpa izin.
- Gunakan gambar di `assets/img/` yang disediakan pemilik proyek. Jika belum ada, gunakan placeholder CSS (gradient halus dengan label "Foto contoh").
- Setiap gambar informatif memiliki `alt` bermakna. Gambar dekoratif memakai `alt=""`.

### 10.6 Gerakan

- Transisi 150 sampai 200 ms untuk hover dan fokus.
- Hormati `prefers-reduced-motion`.

### 10.7 Responsif

Uji pada lebar 360, 390, 768, 1024, dan 1440 px. Tidak boleh ada horizontal scroll pada body.

---

## 11. Aksesibilitas dan Kualitas Kode

- HTML semantik: `header`, `nav`, `main`, `section`, `footer`, `article`, `button`.
- Setiap input memiliki `label`. Pesan error dihubungkan dengan `aria-describedby`.
- Fokus terlihat dengan `:focus-visible`.
- Dialog memakai elemen `<dialog>` atau pola setara dengan fokus yang benar dan tombol Esc.
- Status tidak hanya disampaikan dengan warna.
- Tombol icon-only wajib memiliki `aria-label`.
- Tidak ada `console.log` tertinggal.
- Data dari input pengguna yang masuk ke `innerHTML` wajib lewat `escapeHtml()` di `ui.js`.
- JS berada di file, bukan inline, kecuali potongan sangat kecil.

---

## 12. Larangan

- Jangan memakai framework, library UI, bundler, atau npm.
- Jangan membuat backend, server, atau API palsu yang seolah nyata.
- Jangan menulis password, token, atau secret ke kode selain akun seed di 5.1.
- Jangan menyimpan password di `localStorage`.
- Jangan menyatakan login, pembayaran, email, atau upload cloud nyata.
- Jangan menampilkan harga atau kuota tanpa label "Harga demo".
- Jangan menambah role baru.
- Jangan membuat tombol atau tautan yang tidak berfungsi. Jika fitur belum ada, sembunyikan atau beri label "Segera hadir".
- Jangan mengarang klaim bisnis, testimoni nyata, angka statistik, alamat, atau sejarah perusahaan.

---

## 13. Format Laporan Agent

Setiap sesi kerja diakhiri laporan singkat:

```text
Dikerjakan: ...
File berubah: ...
Belum selesai: ...
Uji manual: halaman X, Y (lebar 390 dan 1024 px)
Keputusan baru atau pertanyaan: ...
```

Perbarui `PROGRESS.md` setiap kali satu bagian selesai.

---

## 14. Definisi Selesai Versi Demo

- Semua halaman di bagian 4 ada dan dapat dibuka.
- Login demo sebagai user dan admin berfungsi. Login salah menampilkan error.
- Header, CTA beranda, dan area yang tersedia berbeda sebelum login, sesudah login sebagai user, dan sesudah login sebagai admin.
- Guard untuk `app/*` dan `admin/*` berjalan.
- Semua tombol, form, filter, dialog, dan tabel berfungsi dengan data seed.
- Perubahan di admin langsung terlihat di area user, misalnya proyek yang dibuat admin dan terhubung ke user.
- Reset data demo mengembalikan kondisi awal.
- Semua harga menampilkan label "Harga demo".
- Responsif pada 360, 390, 768, 1024, dan 1440 px.
- README menjelaskan cara membuka, akun demo, dan cara reset.
- Tidak ada error di konsol browser saat navigasi normal.

---

## 15. Aturan Konten

- Nama brand: Momenin.
- Kalimat positioning: "Momenin membantu pelanggan mengabadikan momen penting melalui layanan dokumentasi profesional dan mengakses kenangannya secara praktis melalui album digital."
- Kanal yang boleh disebut sebagai konten informatif: Instagram, TikTok, website, dan kolaborasi dengan event organizer.
- Program loyalitas, diskon, dan klaim statistik tidak ditampilkan kecuali ditandai "Segera hadir" atau "Contoh".
- Kontak resmi, alamat, dan identitas legal belum ditetapkan. Gunakan placeholder "[isi kontak resmi]".
