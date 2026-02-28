// ─── DATABASE TYPES ────────────────────────────────────────────

export type PlanType = 'free' | 'starter' | 'pro' | 'business'

export type Business = {
  id: string
  owner_id: string
  name: string
  slug: string              // → namabisnis.katalio.id
  description: string | null
  logo_url: string | null
  banner_url: string | null
  template_id: string | null
  theme_color: string
  plan: PlanType
  custom_domain: string | null
  whatsapp_number: string | null
  instagram_handle: string | null
  address: string | null
  city: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  business_id: string
  name: string
  emoji: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export type Product = {
  id: string
  business_id: string
  category_id: string | null
  name: string
  description: string | null
  price: number
  original_price: number | null  // untuk coret harga / diskon
  image_url: string | null
  images: string[]               // multiple images (Pro)
  is_available: boolean
  is_featured: boolean
  badge: string | null           // 'Terlaris', 'Baru', 'Promo', dll
  sort_order: number
  created_at: string
  updated_at: string
}

export type Template = {
  id: string
  name: string
  preview_url: string
  thumbnail_url: string
  category: string         // 'fnb' | 'fashion' | 'beauty' | 'general'
  price: number            // 0 = gratis
  is_premium: boolean
  times_used: number
  rating: number
  created_at: string
}

export type QRScan = {
  id: string
  business_id: string
  scanned_at: string
  city: string | null
  device_type: 'mobile' | 'desktop' | 'tablet' | null
  referrer: string | null
}

// ─── FORM TYPES ────────────────────────────────────────────────

export type CreateBusinessForm = {
  name: string
  slug: string
  description?: string
  city?: string
  whatsapp_number?: string
}

export type CreateProductForm = {
  name: string
  description?: string
  price: number
  original_price?: number
  category_id?: string
  badge?: string
  is_available: boolean
  is_featured: boolean
}

export type CreateCategoryForm = {
  name: string
  emoji?: string
}

// ─── API RESPONSE TYPES ─────────────────────────────────────────

export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export type PaginatedResponse<T> = {
  data: T[]
  count: number
  page: number
  per_page: number
}

// ─── ANALYTICS TYPES ────────────────────────────────────────────

export type AnalyticsSummary = {
  total_scans: number
  scans_today: number
  scans_this_week: number
  scans_this_month: number
  top_products: { product_id: string; name: string; views: number }[]
  peak_hours: { hour: number; count: number }[]
}

// ─── UI TYPES ──────────────────────────────────────────────────

export type NavItem = {
  label: string
  href: string
  icon?: string
  badge?: string
}

export type ToastType = 'success' | 'error' | 'warning' | 'info'
