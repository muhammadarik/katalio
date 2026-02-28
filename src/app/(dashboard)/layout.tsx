import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/dashboard',             label: 'Beranda',   icon: '🏠' },
  { href: '/dashboard/products',    label: 'Produk',    icon: '📦' },
  { href: '/dashboard/catalog',     label: 'Katalog',   icon: '🗂️'  },
  { href: '/dashboard/templates',   label: 'Template',  icon: '🎨' },
  { href: '/dashboard/analytics',   label: 'Analitik',  icon: '📊' },
  { href: '/dashboard/settings',    label: 'Pengaturan',icon: '⚙️' },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: business } = await supabase
    .from('businesses')
    .select('name, slug, plan, logo_url')
    .eq('owner_id', user.id)
    .single()

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-cream-300 flex flex-col fixed inset-y-0 z-50">
        {/* Logo */}
        <div className="p-6 border-b border-cream-200">
          <Link href="/" className="font-display text-2xl font-black text-ink">
            kata<span className="text-terra">lio</span>
          </Link>
        </div>

        {/* Business info */}
        {business && (
          <div className="px-4 py-3 border-b border-cream-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-terra flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {business.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{business.name}</p>
                <p className="text-xs text-stone capitalize">{business.plan} plan</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone hover:text-ink hover:bg-cream transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-cream-200 space-y-2">
          {business && (
            <Link
              href={`/${business.slug}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-terra hover:bg-cream transition-colors"
            >
              <span>🔗</span>
              Lihat Katalog
            </Link>
          )}
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-stone hover:text-ink hover:bg-cream transition-colors"
            >
              <span>👋</span>
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  )
}
