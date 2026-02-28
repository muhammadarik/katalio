import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Katalio — Katalog Digital untuk Bisnis Anda',
    template: '%s | Katalio',
  },
  description:
    'Buat katalog produk digital profesional dalam 10 menit. Tempel QR di meja, share link — pelanggan langsung lihat semua produk Anda.',
  keywords: ['katalog digital', 'QR menu', 'UMKM', 'digital catalog', 'menu digital'],
  authors: [{ name: 'Katalio' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://katalio.id',
    siteName: 'Katalio',
    title: 'Katalio — Katalog Digital untuk Bisnis Anda',
    description:
      'Buat katalog produk digital profesional dalam 10 menit. Pelanggan scan QR, langsung lihat semua produk Anda.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katalio — Katalog Digital untuk Bisnis Anda',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
