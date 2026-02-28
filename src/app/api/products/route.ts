import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createProductSchema } from '@/lib/validations'

// GET /api/products?business_id=xxx
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('business_id')

  if (!businessId) {
    return NextResponse.json({ error: 'business_id diperlukan' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, emoji)')
    .eq('business_id', businessId)
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// POST /api/products — buat produk baru
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = createProductSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    )
  }

  // Verifikasi ownership bisnis
  const { data: business } = await supabase
    .from('businesses')
    .select('id, plan')
    .eq('id', body.business_id)
    .eq('owner_id', user.id)
    .single()

  if (!business) {
    return NextResponse.json({ error: 'Bisnis tidak ditemukan' }, { status: 404 })
  }

  // Cek limit produk per plan
  const planLimits = { free: 20, starter: 100, pro: Infinity, business: Infinity }
  const limit = planLimits[business.plan as keyof typeof planLimits] || 20

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)

  if ((count || 0) >= limit) {
    return NextResponse.json(
      { error: `Plan ${business.plan} hanya bisa tambah ${limit} produk. Upgrade plan untuk tambah lebih banyak.` },
      { status: 403 }
    )
  }

  const { data, error } = await supabase
    .from('products')
    .insert({ ...parsed.data, business_id: body.business_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
