<div align="center">

# ♻️ Robah — Bandung Bersih, Mulai dari Genggamanmu

![Robah Illustration](public/img/illustration.gif)

[![GitHub Stars](https://img.shields.io/github/stars/chndrwali/runtah-web?style=for-the-badge&logo=github&color=264653)](https://github.com/chndrwali/runtah-web/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/chndrwali/runtah-web?style=for-the-badge&logo=github&color=2a9d8f)](https://github.com/chndrwali/runtah-web/network/members)
[![License MIT](https://img.shields.io/github/license/chndrwali/runtah-web?style=for-the-badge&color=e9c46a)](LICENSE)

**Platform klasifikasi sampah berbasis AI untuk mendorong kebiasaan daur ulang melalui sistem Poin Reward.**

**Robah** adalah platform inovatif berbasis web yang dirancang untuk membantu masyarakat mewujudkan lingkungan yang lebih hijau dan bersih melalui manajemen pengelolaan sampah yang terpadu. Dengan memanfaatkan teknologi **AI (Artificial Intelligence)**, Robah memudahkan klasifikasi jenis sampah secara instan—membantu pengguna memilah sampah organik, anorganik, hingga jenis bahan spesifik (seperti logam, kaca, dan plastik) dengan cepat dan akurat.

Tujuan utama dari sistem ini adalah **mendorong kebiasaan daur ulang** dengan memberikan **Poin Reward** kepada pengguna untuk setiap sampah yang berhasil di-scan dan disalurkan.

[🌐 Live Demo](https://robah.vercel.app) · [🐛 Report Bug](https://github.com/chndrwali/runtah-web/issues) · [✨ Request Feature](https://github.com/chndrwali/runtah-web/issues)

</div>

---

## 🌟 Fitur Utama

| Fitur                        | Deskripsi                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------- |
| 🤖 **Scan Sampah dengan AI** | Klasifikasi jenis sampah secara real-time menggunakan kamera atau upload gambar |
| 🎁 **Sistem Poin & Reward**  | Kumpulkan poin dari setiap sampah yang di-scan, tukarkan dengan voucher/hadiah  |
| 🗺️ **Peta Titik Kumpul**     | Temukan lokasi bank sampah atau drop-off point terdekat                         |
| 📊 **Dashboard Personal**    | Lacak total poin, riwayat transaksi, dan berat sampah yang didaur ulang         |
| 🌗 **Light & Dark Mode**     | Antarmuka modern yang responsif dengan dukungan tema terang & gelap             |

---

## 🛠️ Tech Stack

| Layer           | Teknologi                                                                         |
| --------------- | --------------------------------------------------------------------------------- |
| **Framework**   | [Next.js 16](https://nextjs.org/) (App Router, React 19)                          |
| **Styling**     | [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) |
| **API**         | [tRPC](https://trpc.io/) (End-to-end type safety)                                 |
| **Database**    | PostgreSQL + [Prisma ORM](https://www.prisma.io/)                                 |
| **Auth**        | Better Auth (Session-based)                                                       |
| **File Upload** | UploadThing                                                                       |
| **Animation**   | GSAP & Motion                                                                     |
| **Maps**        | Leaflet + React Leaflet                                                           |
| **Deployment**  | Vercel                                                                            |

---

## 🚀 Getting Started

### Persyaratan

- **Node.js** ≥ 20.x
- **npm** / yarn / pnpm
- **PostgreSQL** (lokal atau cloud — Supabase/Neon)

### Instalasi

```bash
# 1. Clone repo
git clone https://github.com/chndrwali/runtah-web.git
cd runtah-web

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env sesuai konfigurasi database & API key Anda
```

### Konfigurasi Environment

```env
DATABASE_URL="postgresql://user:password@localhost:5432/robah_db"
BETTER_AUTH_SECRET="your-super-secret-key-here"
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL="http://localhost:3000"

# (Opsional)
RESEND_API_KEY=""
UPLOADTHING_TOKEN=""
```

### Jalankan

```bash
# Inisialisasi database
npx prisma generate
npx prisma db push

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📂 Struktur Folder

```plaintext
runtah-web/
├── app/                  # Next.js 16 App Router
│   ├── (public)/         # Halaman publik (Landing & User Dashboard)
│   ├── (admin)/          # CMS Dashboard untuk admin
│   ├── (auth)/           # Login, Register, Forgot/Reset Password
│   └── onboarding/       # Onboarding flow untuk user baru
├── components/           # Reusable UI components (shadcn/ui & custom)
├── hooks/                # Custom React hooks (session, auth, dll.)
├── lib/                  # Utility functions, konfigurasi env, formatters
├── modules/              # Pemisahan fitur (Public, Admin, Auth sections)
├── prisma/               # Schema database & file migrasi
├── public/               # Static assets (gambar, favicon, model AI)
├── trpc/                 # Routing, context & client tRPC
└── types/                # TypeScript type definitions
```

---

## 🛡️ Best Practices

- **SEO Optimization** — OpenGraph, Meta Description, Twitter Cards, dan Title Tags dinamis di seluruh halaman
- **Type Safety** — Prisma schema + tRPC untuk tipe data E2E yang konsisten
- **Semantic UI** — Tailwind CSS variabel semantik untuk Light/Dark Mode yang tersinkronisasi

---

## 🤝 Kontribusi

1. **Fork** repositori ini
2. Buat branch fitur (`git checkout -b feature/FiturKeren`)
3. Commit perubahan (`git commit -m 'Menambahkan FiturKeren'`)
4. Push ke branch (`git push origin feature/FiturKeren`)
5. Buka **Pull Request**

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat [`LICENSE`](LICENSE) untuk informasi lebih lanjut.

---

<div align="center">

_Dikembangkan dengan ❤️ untuk masa depan lingkungan yang lebih baik._

</div>
