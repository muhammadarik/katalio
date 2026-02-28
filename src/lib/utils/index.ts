import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format harga ke Rupiah
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Slug validator — hanya huruf kecil, angka, dan strip
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{2,29}$/.test(slug)
}

// Buat slug dari nama bisnis
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 30)
}

// Format tanggal ke format Indonesia
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

// Format angka besar: 2800 → "2.8rb"
export function formatCount(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}jt`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}rb`
  return num.toString()
}

// Ambil URL katalog bisnis
export function getCatalogUrl(slug: string, customDomain?: string | null): string {
  if (customDomain) return `https://${customDomain}`
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'katalio.id'
  const isDev = process.env.NODE_ENV === 'development'
  return isDev
    ? `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`
    : `https://${slug}.${domain}`
}

// Truncate teks
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength).trim() + '...'
}

// Delay (untuk loading state)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
