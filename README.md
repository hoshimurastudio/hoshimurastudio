# Hoshimura Studio

Website studio untuk jasa **Video Editing** dan **Web Design**. Bahasa Jepang menjadi default pada kunjungan pertama, dengan pilihan English dan dark/light mode. Pilihan pengunjung disimpan di browser.

## Jalankan di localhost

Gunakan Node.js 20 atau lebih baru. Tidak perlu instalasi dependency.

```powershell
cd "C:\Users\koman\Suta Start\HoshimuraStudio\studio-site"
npm run dev
```

Buka **http://localhost:4173**. Server hanya mendengarkan koneksi lokal. Hentikan dengan `Ctrl+C`. Setelah mengubah file, refresh browser.

Jika port tersebut terpakai:

```powershell
$env:PORT = 4174
npm run dev
```

Pemeriksaan kode dan interaksi bahasa/tema:

```powershell
npm run check
```

## Struktur dan pengeditan

- `dist/index.html`: struktur halaman dan teks Jepang.
- `dist/portfolio.html`: halaman portofolio dengan kategori Video Editing dan Web Design. Kedua kategori sengaja kosong sampai karya siap dipublikasikan.
- `dist/app.js`: teks English serta pengaturan bahasa dan tema.
- `dist/style.css`: tampilan, responsivitas, dan pemotongan logo.
- `dist/assets/`: logo PNG asli yang Anda berikan.
- `server.mjs`: server preview lokal tanpa dependency.

Visual pada kartu jasa merupakan ilustrasi, bukan klaim portofolio. Link channel resmi YouTube sudah aktif: https://www.youtube.com/@HoshimuraStudio. Kontak masih diberi status segera hadir. Isi bagian `.contact` saat informasinya tersedia; perbarui teks Jepang dan English bersamaan. Font Google menggunakan internet; jika offline, browser memakai font sistem.

## Masukkan ke repository GitHub

Repository tujuan: **https://github.com/hoshimurastudio/hoshimurastudio**.

Gunakan **isi folder `studio-site` sebagai root repository**, sehingga `package.json` dan `dist/` berada langsung di root. Folder ini sudah memiliki riwayat Git lokal dari pembuatan awal. Metadata `.openai/` tidak diperlukan untuk menjalankan website sendiri dan sudah diabaikan; metadata versi awal masih ada di riwayat Git. Tidak ada dependency pada layanan Sites untuk menjalankan HTML, CSS, dan JavaScript ini.

Untuk mengirim perubahan berikutnya setelah autentikasi akun usaha selesai:

```powershell
git add .
git commit -m "Update Hoshimura Studio website"
git push origin main
```

Periksa `git remote -v` sebelum push: `origin` harus menunjuk ke repository akun `hoshimurastudio`. Push baru memicu publikasi Cloudflare setelah repository dihubungkan ke project Pages dengan deployment otomatis aktif.

## Aktifkan melalui Cloudflare Pages

Website ini berupa HTML, CSS, dan JavaScript statis, sehingga tidak memerlukan server Node.js di hosting. `server.mjs` hanya untuk preview lokal.

Setelah source berada di GitHub:

1. Buka dashboard Cloudflare → **Workers & Pages** → **Create application** → **Pages** → hubungkan repository GitHub.
2. Pilih repository Hoshimura Studio dan production branch yang berisi source, misalnya `main`.
3. Gunakan pengaturan berikut jika isi `studio-site` berada di root repository:

| Pengaturan | Nilai |
| --- | --- |
| Framework preset | `None` |
| Build command | `npm run check` |
| Build output directory | `dist` |
| Root directory | Kosongkan (root repository) |

4. Klik **Save and Deploy**. Pemeriksaan kode harus berhasil sebelum file `dist/` dipublikasikan.
5. Gunakan subdomain `pages.dev` yang diberikan Cloudflare. Nama project yang dipilih menentukan alamatnya dan harus masih tersedia.

Jika source ditempatkan di subfolder repository, isi **Root directory** dengan lokasi folder yang berisi `package.json`, bukan folder `dist`.

Setelah integrasi aktif, push berikutnya ke production branch dapat memperbarui website secara otomatis. Tidak perlu mengatur token Cloudflare di source atau mengaktifkan GitHub Pages. HTTPS ditangani Cloudflare; domain sendiri bisa dihubungkan nanti.

Referensi: [Cloudflare Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

Saat ini pengembangan dilakukan lokal. Versi privat awal yang terlanjur terbit di Sites merupakan deployment terpisah; perubahan lokal tidak dikirim ke sana.
