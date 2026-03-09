# Robah: Solusi Cerdas Klasifikasi Sampah ♻️

![Robah Illustration](public/img/illustration.gif)

**Robah** adalah platform inovatif berbasis web yang dirancang untuk membantu masyarakat mewujudkan lingkungan yang lebih hijau dan bersih melalui manajemen pengelolaan sampah yang terpadu. Dengan memanfaatkan teknologi **AI (Artificial Intelligence)**, Robah memudahkan klasifikasi jenis sampah secara instan—membantu pengguna memilah sampah organik, anorganik, hingga jenis bahan spesifik (seperti logam, kaca, dan plastik) dengan cepat dan akurat.

Tujuan utama dari sistem ini adalah **mendorong kebiasaan daur ulang** dengan memberikan **Poin Reward** kepada pengguna untuk setiap sampah yang berhasil di-scan dan disalurkan.

---

## 🌟 Fitur Utama

- **Scan Sampah dengan AI**: Integrasi Artificial Intelligence untuk mendeteksi dan mengkategorikan sampah secara real-time hanya dengan mengunggah atau memotret sampah menggunakan kamera perangkat.
- **Sistem Poin & Katalog Hadiah (Reward)**: Setiap sampah yang discan dan divalidasi akan dikonversi menjadi poin yang nantinya bisa ditukarkan dengan berbagai _voucher_ atau hadiah di Katalog Reward.
- **Peta Titik Kumpul (Drop-off Maps)**: Bantu temukan lokasi bank sampah atau tempat pembuangan terdekat di area Anda.
- **Dashboard Personal**: Lacak secara langsung total poin yang dikumpulkan, sejarah riwayat transaksi sampah yang telah diselamatkan, hingga total berat (kg) sampah yang Anda daur ulang.
- **Responsive & Modern UI**: Antarmuka modern yang nyaman (mendukung mode terang dan gelap), memberikan alur yang sangat mudah dinavigasi oleh pengguna dari semua kalangan.

---

## 🛠️ Stack Teknologi (Tech Stack)

Aplikasi ini dibangun dengan _best practices_ menggunakan teknologi ekosistem modern web:

- **Framework Core:** [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **API & Type Safety:** [tRPC](https://trpc.io/) terintegrasi secara _end-to-end_ (E2E) dengan backend
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Autentikasi:** Better Auth (Session based / Server Actions)
- **Komponen Ekstra:** UploadThing (File Uploads), React Query (Data Fetching), Lucide React (Icons)
- **Deployment:** Vercel

---

## 🚀 Panduan Memulai (Getting Started)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini secara lokal di mesin Anda.

### 1. Persyaratan Sistem

Pastikan Anda telah menginstal:

- Node.js (Minimal versi 20.x)
- NPM atau Yarn atau pnpm
- Database PostgreSQL (Lokal atau layanan cloud seperti Supabase/Neon)

### 2. Kloning Repositori

```bash
git clone https://github.com/chndrwali/runtah-web.git
cd runtah-web
```

### 3. Instalasi Dependensi

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 4. Konfigurasi Environment (Variabel Lingkungan)

Buat file `.env` di direktori _root_ (Anda bisa menggunakan `.env.example` sebagai referensi jika tersedia), dan atur variabel berikut:

```env
# Koneksi Database PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/robah_db"

# Secret Keys untuk Autentikasi / Sesi (bisa generate string acak)
BETTER_AUTH_SECRET="your-super-secret-key-here"
BETTER_AUTH_URL=http://localhost:3000

# (Opsional) API Key Provider Eksternal (UploadThing, dll)
NEXT_PUBLIC_URL="http://localhost:3000"
RESEND_API_KEY=""
UPLOADTHING_TOKEN=""

```

### 5. Inisialisasi Database (Prisma)

Migrasi skema database Prisma ke server PostgreSQL dan buat _client_:

```bash
npx prisma generate
npx prisma db push

# (Opsional) Jika Anda ingin melihat isi database secara visual melalui browser:
npx prisma studio
```

### 6. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

---

## 📂 Struktur Folder Utama

```plaintext
runtah-web/
├── app/                  # Next.js 16 App Router (Pages, Layouts, API Routes)
│   ├── (public)/         # Halaman untuk end-user (Landing page & User Dashboard)
│   ├── (admin)/          # CMS Dashboard (Manajemen sistem untuk admin)
│   └── (auth)/           # Pages untuk Login, Register & Reset Password
├── components/           # Reusable UI components (shadcn ui & custom components)
├── lib/                  # Utility functions, konfigurasi Env, formatters
├── modules/              # Pemisahan fitur (Public UI & Admin UI sections)
├── prisma/               # Schema Database dan file migrasi
├── public/               # Static assets (gambar, favicon, *illustration.gif*)
├── trpc/                 # Pengaturan routing, context, & client tRPC
└── server/               # Business logic backend (Implementasi Router tRPC)
```

---

## 🛡️ Best Practices & Quality Assurance

Proyek ini telah melalui proses penerapan _best practices_:

- **SEO Optimization**: Seluruh halaman publik dan dashboard telah disematkan OpenGraph, Meta Deskripsi, & Title Tags dinamis untuk performa SEO _crawler_ yang optimal.
- **Semantic UI/Dark Mode**: Seluruh palet warna komponen (background, border, text) menggunakan Tailwind variabel semantic (misal: `bg-card`, `text-primary-foreground`) sehingga memastikan tema _Dark Mode_ dan _Light Mode_ konsisten tersinkronisasi.
- **Type Safety**: Skema Prisma (Database) dan sisi frontend React berbagi tipe data melalui perantara tRPC, menyingkirkan isu "tipe tidak cocok" saat iterasi pengembangan.

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi!

1. Lakukan _Follow_ dan _Fork_ pada repo ini.
2. Buat _branch_ fitur Anda (`git checkout -b feature/FiturKeren`).
3. _Commit_ perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`).
4. Lakukan _Push_ ke _branch_ (`git push origin feature/FiturKeren`).
5. Buka **Pull Request** ke branch utama repositori ini.

---

## 📄 Lisensi (License)

Distributed under the MIT License. See `LICENSE` for more information.

---

_Dikembangkan dengan ❤️ untuk masa depan lingkungan yang lebih baik._
