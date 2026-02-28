import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Cek apakah sudah punya bisnis
  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, slug, plan, is_active')
    .eq('owner_id', user.id)
    .single()

  // Belum punya bisnis → arahkan ke onboarding
  if (!business) redirect('/dashboard/onboarding')

  // Ambil stats ringkasan
  const [{ count: productCount }, { count: scanCount }] = await Promise.all([
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', business.id),
    supabase
      .from('qr_scans')
      .select('*', { count: 'exact', head: true })
      .eq('business_id', business.id)
      .gte('scanned_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-ink">
          Selamat datang! 👋
        </h1>
        <p className="text-stone mt-1">
          Kelola katalog <strong className="text-ink">{business.name}</strong> dari sini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <p className="text-stone text-sm font-medium mb-1">Total Produk</p>
          <p className="font-display text-4xl font-black text-ink">{productCount ?? 0}</p>
        </div>
        <div className="card">
          <p className="text-stone text-sm font-medium mb-1">Scan QR (30 hari)</p>
          <p className="font-display text-4xl font-black text-terra">{scanCount ?? 0}</p>
        </div>
        <div className="card">
          <p className="text-stone text-sm font-medium mb-1">Plan Aktif</p>
          <p className="font-display text-4xl font-black text-ink capitalize">{business.plan}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="font-display text-xl font-bold text-ink mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/dashboard/products/new" className="btn-primary">
            + Tambah Produk
          </a>
          <a href={`/${business.slug}`} target="_blank" className="btn-secondary">
            Lihat Katalog →
          </a>
          <a href="/dashboard/qr" className="btn-ghost">
            Download QR
          </a>
        </div>
      </div>
    </div>
  )
}
