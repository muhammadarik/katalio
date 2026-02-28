import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const format = searchParams.get('format') || 'png' // png | svg

  if (!slug) {
    return NextResponse.json({ error: 'slug diperlukan' }, { status: 400 })
  }

  // Verifikasi bisnis ada
  const supabase = await createClient()
  const { data: business } = await supabase
    .from('businesses')
    .select('id, slug, custom_domain, plan')
    .eq('slug', slug)
    .single()

  if (!business) {
    return NextResponse.json({ error: 'Bisnis tidak ditemukan' }, { status: 404 })
  }

  // Tentukan URL katalog
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'katalio.id'
  const catalogUrl = business.custom_domain
    ? `https://${business.custom_domain}`
    : `https://${slug}.${domain}`

  try {
    if (format === 'svg') {
      const svg = await QRCode.toString(catalogUrl, {
        type: 'svg',
        margin: 2,
        color: { dark: '#1e1a15', light: '#f7f4ef' },
      })
      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': `attachment; filename="katalio-qr-${slug}.svg"`,
        },
      })
    }

    // Default: PNG buffer
    const buffer = await QRCode.toBuffer(catalogUrl, {
      type: 'png',
      width: 512,
      margin: 2,
      color: { dark: '#1e1a15', light: '#f7f4ef' },
    })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="katalio-qr-${slug}.png"`,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal generate QR' }, { status: 500 })
  }
}
