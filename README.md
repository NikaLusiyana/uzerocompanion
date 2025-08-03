# 🧾 Tugas Akhir Fullstack Next.js - Fase 2 JIDA

**Nama Proyek**: Uzero Companion  
**Demo Live**: [https://uzerocompanion.vercel.app](https://uzerocompanion.vercel.app)  
**Stack**: Next.js 15.4.2 (App Router) • PostgreSQL (Neon) • Tailwind CSS • Prisma • NextAuth.js

---

## 🎯 Deskripsi Singkat

_Uzero Companion_ adalah aplikasi dokumentasi digital bertema worldbuilding dan pengelolaan cerita fiksi. Aplikasi ini memungkinkan pengguna untuk mencatat elemen-elemen dunia cerita seperti **buku, bab, karakter, lokasi, glosarium, hingga profil dunia**, dengan sistem autentikasi pengguna dan tampilan UI yang sepenuhnya dikustomisasi.

---

## 📌 Fitur Utama

### ✅ Sistem Autentikasi
- Menggunakan **NextAuth.js**
- Login dengan akun Google
- Manual register dan login via email/password

### ✅ Fitur CRUD
#### 1. **Books**
- Buat, lihat, edit, hapus data buku
- Menyimpan judul, genre, dan statistik pembaca
- Paginasi ditambahkan di daftar buku
- UI: Komponen khusus `BookRow`, `StatCard`, `Pagination`, dll

#### 2. **Chapters**
- CRUD bab di dalam masing-masing buku
- Nested dynamic routing: `/books/[id]/chapters/[chapterId]`

#### Fitur CRUD lainnya (strukturnya sudah tersedia, siap dikembangkan):
- **Characters**
- **Glossary**
- **Locations**
- **Worldbuilding**

### ✅ Halaman Khusus
- **/about**: halaman informasi tentang aplikasi
- **/contact**: form kontak statis
- **404 Custom Page**: halaman error jika rute tidak ditemukan, dibuat sendiri (`app/not-found.tsx`)
-  Semua halaman di dalam `app/home/*` menggunakan **layout konsisten dan dibungkus oleh `providers.tsx`** untuk shared state seperti auth, alert, dan UI context.

### ✅ UI Komponen Kustom
- Tidak menggunakan template admin
- Semua UI dibangun dari nol menggunakan:
  - Tailwind CSS
  - Komponen buatan sendiri di `components/ui/`, seperti:
    - `Navbar`, `Footer`, `PageHeader`
    - `ActionButton`, `ConfirmDialog`, `GlobalAlert`
    - Komponen responsif dan konsisten antar halaman

---

## 🧱 Struktur Folder Utama (Simplified)

/app
├── api # Route handlers (Next.js API routes)
│ ├── auth # Login & register
│ ├── books # CRUD book & nested chapters
│ ├── genres # Genre data
│ └── profile # User profile (optional)
├── home # Semua halaman utama aplikasi
│ ├── books # Daftar buku + nested chapter
│ ├── characters # Karakter (struktur tersedia)
│ ├── glossary # Glosarium istilah
│ ├── locations # Lokasi cerita
│ ├── worldbuilding# Dunia cerita
│ ├── about # Halaman tentang
│ └── contact # Halaman kontak
/components
├── auth # Form login & register
├── books # Tampilan buku & statistik
└── ui # Komponen UI custom


## 🗃️ Teknologi dan Tools

| Teknologi     | Keterangan |
|---------------|------------|
| **Next.js 15.4.2** | Framework utama, App Router |
| **Prisma**     | ORM untuk PostgreSQL |
| **PostgreSQL Neon** | Database cloud |
| **Tailwind CSS** | Styling responsif |
| **NextAuth.js** | Sistem autentikasi |
| **Vercel**     | Hosting dan deployment |

---

## 🔐 Database dan Autentikasi

- Database yang digunakan adalah **Neon (PostgreSQL)**, dengan koneksi dikelola oleh Prisma dan disimpan aman di environment Vercel.
- Sistem login dan register menggunakan NextAuth.js, sudah mendukung login Google OAuth dan manual form register.

---

## 🚀 Deployment

Aplikasi telah di-deploy dan dapat diakses melalui:  
👉 [https://uzerocompanion.vercel.app](https://uzerocompanion.vercel.app)

---

## 🛠️ Catatan Pengembangan

- Folder dan route telah disiapkan untuk fitur lanjutan seperti karakter, lokasi, dan glosarium.
- Komponen reuseable disusun modular untuk mempermudah scaling dan maintainability.
- Tidak ada penggunaan template admin dashboard. Semua UI dirancang sendiri dari awal.

---

## 🙋‍♂️ Developer

Tugas akhir ini disusun sebagai bagian dari **kelas Fullstack Next.js - Fase 2 JIDA** untuk menguji pemahaman menyeluruh tentang:

- Routing App Directory
- Auth dan API Routes
- Integrasi Database
- Penggunaan Component Library
- Deployment skala production

---
