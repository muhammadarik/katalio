'use client'

const testimonials = [
  {
    quote: 'Dulu 30 chat WA per hari cuma buat jawab "ada menu apa". Sekarang tinggal share link.',
    name: 'Sari Rahayu',
    business: 'Warung Sari Rasa · Yogyakarta',
    avatar: 'SR',
    color: '#c4623a',
  },
  {
    quote: 'Setup 15 menit, QR langsung tempel di meja. Tamu sering bilang keren.',
    name: 'Bagas Hananto',
    business: 'Kopi Nusantara · Bandung',
    avatar: 'BH',
    color: '#3a7d5c',
  },
  {
    quote: 'Omzet naik 35% karena pelanggan bisa scroll semua produk sendiri.',
    name: 'Dewi Puspita',
    business: 'Butik Cantik · Surabaya',
    avatar: 'DP',
    color: '#d4920a',
  },
]

const stats = [
  { num: '2.800+', label: 'Bisnis aktif' },
  { num: '48rb+',  label: 'Produk terdaftar' },
  { num: '98%',    label: 'Kepuasan pengguna' },
]

export default function AuthPanel() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1e1a15 0%, #2d2318 60%, #3a2a1a 100%)' }}
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #c4623a, transparent)' }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, #d4920a, transparent)' }}
      />

      {/* Top: Logo */}
      <div className="relative z-10">
        <div className="text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#f7f4ef' }}>
          kata<span style={{ color: '#c4623a' }}>lio</span>
        </div>
      </div>

      {/* Middle: Mock catalog preview */}
      <div className="relative z-10 my-8">
        {/* Floating catalog card */}
        <div
          className="rounded-2xl p-5 mb-4 border"
          style={{
            background: 'rgba(247,244,239,0.06)',
            borderColor: 'rgba(247,244,239,0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: '#c4623a', fontFamily: 'Playfair Display, serif' }}
            >
              KN
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#f7f4ef' }}>Kopi Nusantara</p>
              <p className="text-xs" style={{ color: 'rgba(247,244,239,0.45)' }}>kopinusantara.katalio.id</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3a7d5c' }} />
              <span className="text-xs" style={{ color: '#3a7d5c' }}>Live</span>
            </div>
          </div>

          {/* Mini product list */}
          <div className="space-y-2">
            {[
              { emoji: '☕', name: 'Kopi Tubruk Gayo', price: 'Rp 22.000', badge: 'Terlaris' },
              { emoji: '🌿', name: 'Matcha Latte Premium', price: 'Rp 35.000', badge: null },
              { emoji: '🥐', name: 'Croissant Mentega', price: 'Rp 28.000', badge: 'Baru' },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 p-2.5 rounded-xl"
                style={{ background: 'rgba(247,244,239,0.05)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: 'rgba(196,98,58,0.15)' }}
                >
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: '#f7f4ef' }}>{p.name}</p>
                  <p className="text-xs font-bold" style={{ color: '#c4623a' }}>{p.price}</p>
                </div>
                {p.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md font-semibold flex-shrink-0"
                    style={{ background: 'rgba(196,98,58,0.2)', color: '#e8876a' }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scan count badge */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border w-fit"
          style={{
            background: 'rgba(212,146,10,0.1)',
            borderColor: 'rgba(212,146,10,0.2)',
          }}
        >
          <span className="text-base">📲</span>
          <div>
            <span className="text-sm font-bold" style={{ color: '#d4920a' }}>147</span>
            <span className="text-xs ml-1" style={{ color: 'rgba(247,244,239,0.5)' }}>scan hari ini</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 grid grid-cols-3 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p
              className="text-xl font-black"
              style={{ fontFamily: 'Playfair Display, serif', color: '#f7f4ef' }}
            >
              {s.num}
            </p>
            <p className="text-xs" style={{ color: 'rgba(247,244,239,0.4)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonial carousel (static, first one) */}
      <div
        className="relative z-10 p-5 rounded-2xl border"
        style={{
          background: 'rgba(247,244,239,0.05)',
          borderColor: 'rgba(247,244,239,0.1)',
        }}
      >
        <div className="flex gap-1 mb-3" style={{ color: '#d4920a', fontSize: '0.75rem' }}>
          ★★★★★
        </div>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'rgba(247,244,239,0.7)', fontStyle: 'italic' }}
        >
          "{testimonials[0].quote}"
        </p>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: testimonials[0].color }}
          >
            {testimonials[0].avatar}
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: '#f7f4ef' }}>{testimonials[0].name}</p>
            <p className="text-xs" style={{ color: 'rgba(247,244,239,0.4)' }}>{testimonials[0].business}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
