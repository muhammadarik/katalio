import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { formatRupiah } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: business } = await supabase
    .from('businesses')
    .select('name, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!business) return { title: 'Katalog tidak ditemukan' }

  return {
    title: `${business.name} — Katalog Produk`,
    description: business.description || `Lihat semua produk dari ${business.name}`,
  }
}

export default async function StorefrontPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  // Ambil data bisnis
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!business) notFound()

  // Track scan (fire and forget)
  supabase.from('qr_scans').insert({
    business_id: business.id,
    device_type: 'mobile',
  }).then(() => {})

  // Ambil kategori
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', business.id)
    .eq('is_active', true)
    .order('sort_order')

  // Ambil produk
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id)
    .order('sort_order')

  return (
    <div className="min-h-screen bg-cream">
      {/* Header bisnis */}
      <header className="bg-white border-b border-cream-300 px-4 pt-12 pb-4 text-center">
        {business.logo_url ? (
          <img
            src={business.logo_url}
            alt={business.name}
            className="w-16 h-16 rounded-2xl mx-auto mb-3 object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl mx-auto mb-3 bg-terra flex items-center justify-center text-white font-display font-bold text-2xl">
            {business.name.charAt(0)}
          </div>
        )}
        <h1 className="font-display text-xl font-bold text-ink">{business.name}</h1>
        {business.city && (
          <p className="text-stone text-sm">📍 {business.city}</p>
        )}
        {business.description && (
          <p className="text-stone text-sm mt-1 max-w-xs mx-auto">{business.description}</p>
        )}
      </header>

      {/* Kategori tabs */}
      {categories && categories.length > 0 && (
        <div className="sticky top-0 bg-white border-b border-cream-300 z-10">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
            <button className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold bg-terra text-white">
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium text-stone bg-cream-200 hover:bg-cream-300 transition-colors whitespace-nowrap"
              >
                {cat.emoji && <span className="mr-1">{cat.emoji}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Produk grid */}
      <div className="p-4 space-y-3 max-w-lg mx-auto">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-cream-300 shadow-soft flex items-center gap-3 p-3"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-cream-200 flex items-center justify-center text-2xl flex-shrink-0">
                  🛍️
                </div>
              )}
              <div className="flex-1 min-w-0">
                {product.badge && (
                  <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-md bg-terra/10 text-terra mb-1">
                    {product.badge}
                  </span>
                )}
                <p className="font-semibold text-ink text-sm leading-tight">{product.name}</p>
                {product.description && (
                  <p className="text-stone text-xs mt-0.5 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-bold text-terra text-sm">
                    {formatRupiah(product.price)}
                  </span>
                  {product.original_price && (
                    <span className="text-stone text-xs line-through">
                      {formatRupiah(product.original_price)}
                    </span>
                  )}
                </div>
              </div>
              {!product.is_available && (
                <span className="text-xs text-stone bg-cream-200 px-2 py-1 rounded-lg flex-shrink-0">
                  Habis
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-stone">
            <p className="text-4xl mb-3">🛍️</p>
            <p className="font-semibold">Belum ada produk</p>
          </div>
        )}
      </div>

      {/* Footer powered by Katalio */}
      <footer className="text-center py-6">
        <a
          href="https://katalio.id"
          target="_blank"
          className="text-xs text-stone hover:text-ink transition-colors"
        >
          Dibuat dengan ❤️ menggunakan{' '}
          <span className="font-bold">
            kata<span className="text-terra">lio</span>
          </span>
        </a>
      </footer>
    </div>
  )
}
