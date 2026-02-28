-- ═══════════════════════════════════════════════════════════════
-- KATALIO — Initial Database Schema
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── BUSINESSES ──────────────────────────────────────────────────
create table public.businesses (
  id              uuid primary key default uuid_generate_v4(),
  owner_id        uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  slug            text not null unique,
  description     text,
  logo_url        text,
  banner_url      text,
  template_id     uuid,
  theme_color     text not null default '#c4623a',
  plan            text not null default 'free'
                    check (plan in ('free', 'starter', 'pro', 'business')),
  custom_domain   text unique,
  whatsapp_number text,
  instagram_handle text,
  address         text,
  city            text,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── CATEGORIES ──────────────────────────────────────────────────
create table public.categories (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name        text not null,
  emoji       text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ── PRODUCTS ────────────────────────────────────────────────────
create table public.products (
  id             uuid primary key default uuid_generate_v4(),
  business_id    uuid not null references public.businesses(id) on delete cascade,
  category_id    uuid references public.categories(id) on delete set null,
  name           text not null,
  description    text,
  price          bigint not null default 0,
  original_price bigint,
  image_url      text,
  images         text[] default '{}',
  is_available   boolean not null default true,
  is_featured    boolean not null default false,
  badge          text check (badge in ('Terlaris', 'Baru', 'Promo', 'Habis', null)),
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── TEMPLATES ───────────────────────────────────────────────────
create table public.templates (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  preview_url   text,
  thumbnail_url text,
  category      text not null default 'general',
  price         integer not null default 0,
  is_premium    boolean not null default false,
  times_used    integer not null default 0,
  rating        numeric(3,2) not null default 5.0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ── QR SCANS (analytics) ────────────────────────────────────────
create table public.qr_scans (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  scanned_at  timestamptz not null default now(),
  city        text,
  device_type text check (device_type in ('mobile', 'desktop', 'tablet')),
  referrer    text
);

-- ── USER TEMPLATE PURCHASES ─────────────────────────────────────
create table public.template_purchases (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  template_id uuid not null references public.templates(id),
  purchased_at timestamptz not null default now(),
  unique (user_id, template_id)
);

-- ═══════════════════════════════════════════════════════════════
-- INDEXES — untuk query performance
-- ═══════════════════════════════════════════════════════════════
create index idx_businesses_owner    on public.businesses(owner_id);
create index idx_businesses_slug     on public.businesses(slug);
create index idx_categories_business on public.categories(business_id);
create index idx_products_business   on public.products(business_id);
create index idx_products_category   on public.products(category_id);
create index idx_qr_scans_business   on public.qr_scans(business_id);
create index idx_qr_scans_scanned_at on public.qr_scans(scanned_at);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════
alter table public.businesses         enable row level security;
alter table public.categories         enable row level security;
alter table public.products           enable row level security;
alter table public.qr_scans           enable row level security;
alter table public.template_purchases enable row level security;

-- Businesses: owner bisa semua, publik bisa baca bisnis aktif
create policy "Owner can manage own business"
  on public.businesses for all
  using (auth.uid() = owner_id);

create policy "Public can read active businesses"
  on public.businesses for select
  using (is_active = true);

-- Categories: owner bisa semua, publik bisa baca
create policy "Owner can manage categories"
  on public.categories for all
  using (auth.uid() = (select owner_id from public.businesses where id = business_id));

create policy "Public can read active categories"
  on public.categories for select
  using (is_active = true);

-- Products: owner bisa semua, publik bisa baca yang available
create policy "Owner can manage products"
  on public.products for all
  using (auth.uid() = (select owner_id from public.businesses where id = business_id));

create policy "Public can read available products"
  on public.products for select
  using (true);

-- QR Scans: siapapun bisa insert (tracking), owner bisa baca
create policy "Anyone can insert scan"
  on public.qr_scans for insert
  with check (true);

create policy "Owner can read own scans"
  on public.qr_scans for select
  using (auth.uid() = (select owner_id from public.businesses where id = business_id));

-- Templates: publik bisa baca
create policy "Public can read templates"
  on public.templates for select
  using (is_active = true);

-- ═══════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_businesses_updated_at
  before update on public.businesses
  for each row execute function public.handle_updated_at();

create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════════════════════════════════════

-- Buat via Supabase Dashboard atau jalankan ini:
-- insert into storage.buckets (id, name, public) values ('logos', 'logos', true);
-- insert into storage.buckets (id, name, public) values ('products', 'products', true);
-- insert into storage.buckets (id, name, public) values ('banners', 'banners', true);
