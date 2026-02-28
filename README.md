# katalio 🏪

> Platform katalog digital untuk UMKM Indonesia.  
> Buat katalog produk, tempel QR, pelanggan langsung bisa lihat.

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/username/katalio.git
cd katalio
npm install
```

### 2. Setup Supabase

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Masuk ke **Settings → API**, copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (rahasia!)

### 3. Setup Environment

```bash
cp .env.example .env.local
# Edit .env.local dengan nilai dari Supabase
```

### 4. Setup Database

Masuk ke **Supabase Dashboard → SQL Editor**, jalankan:

```bash
# Copy-paste isi file ini ke SQL Editor Supabase:
supabase/migrations/001_initial_schema.sql
```

### 5. Setup Storage Buckets

Di Supabase Dashboard → Storage, buat 3 bucket:
- `logos` (public)
- `products` (public)  
- `banners` (public)

### 6. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Struktur Project

```
katalio/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Landing page & halaman publik
│   │   │   └── page.tsx          # → katalio.id
│   │   ├── (dashboard)/          # Area owner (butuh login)
│   │   │   ├── layout.tsx        # Sidebar navigation
│   │   │   └── dashboard/
│   │   │       ├── page.tsx      # Dashboard home
│   │   │       ├── products/     # CRUD produk
│   │   │       ├── catalog/      # Pengaturan katalog
│   │   │       ├── templates/    # Template marketplace
│   │   │       ├── analytics/    # Data & statistik
│   │   │       └── settings/     # Pengaturan akun
│   │   ├── (storefront)/
│   │   │   └── [slug]/           # Halaman katalog publik
│   │   │       └── page.tsx      # → namabisnis.katalio.id
│   │   └── api/
│   │       ├── auth/             # Auth endpoints
│   │       ├── products/         # Products CRUD
│   │       ├── qr/               # QR generator
│   │       └── analytics/        # Analytics data
│   ├── components/
│   │   ├── marketing/            # Komponen landing page
│   │   ├── dashboard/            # Komponen dashboard
│   │   ├── catalog/              # Komponen storefront
│   │   ├── shared/               # Komponen reusable
│   │   └── ui/                   # Base UI components
│   ├── lib/
│   │   ├── supabase/             # Client, server, middleware
│   │   ├── utils/                # Helper functions
│   │   ├── hooks/                # Custom React hooks
│   │   └── validations/          # Zod schemas
│   └── types/                    # TypeScript types
├── supabase/
│   └── migrations/               # SQL migration files
├── public/                       # Static assets
├── .env.local                    # Environment variables (jangan di-commit!)
└── .env.example                  # Template env variables
```

---

## 🔑 Environment Variables

| Variable | Keterangan |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (aman di frontend) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service key (RAHASIA, server only!) |
| `NEXT_PUBLIC_APP_URL` | URL app (localhost:3000 di dev) |
| `NEXT_PUBLIC_APP_DOMAIN` | Domain produksi (katalio.id) |
| `OPENAI_API_KEY` | Untuk fitur AI copywriter (opsional) |

---

## 🗺️ Roadmap

### MVP (v0.1) — Sekarang
- [x] Project structure & config
- [x] Database schema (Supabase)
- [x] Auth (login/register)
- [ ] Dashboard owner
- [ ] CRUD produk & kategori
- [ ] Halaman katalog publik
- [ ] QR code generator
- [ ] Landing page

### v0.2
- [ ] Template marketplace
- [ ] Analytics dashboard
- [ ] Upload gambar produk
- [ ] Custom theme per toko

### v0.3
- [ ] AI copywriter produk
- [ ] Custom domain
- [ ] Subscription & payment (Midtrans)
- [ ] WhatsApp integration

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Styling | Tailwind CSS |
| Validation | Zod |
| QR Code | qrcode |
| Deployment | Vercel |

---

## 📝 Catatan Deployment (Vercel)

1. Push ke GitHub
2. Import di [vercel.com](https://vercel.com)
3. Set environment variables di Vercel Dashboard
4. Untuk wildcard subdomain, tambahkan di Vercel:
   - Domain: `*.katalio.id`
   - Wildcard: enabled
5. Update DNS: `CNAME * → cname.vercel-dns.com`

---

Dibuat dengan ❤️ di Indonesia 🇮🇩
