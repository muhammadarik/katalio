'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { loginSchema, registerSchema } from '@/lib/validations'

// ── LOGIN ────────────────────────────────────────────────────────
export async function loginAction(prevState: any, formData: FormData) {
  const raw = {
    email:    formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email atau password salah. Coba lagi.' }
    }
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Email belum diverifikasi. Cek inbox Anda.' }
    }
    return { error: 'Gagal masuk. Coba beberapa saat lagi.' }
  }

  redirect('/dashboard')
}

// ── REGISTER ─────────────────────────────────────────────────────
export async function registerAction(prevState: any, formData: FormData) {
  const raw = {
    email:     formData.get('email') as string,
    password:  formData.get('password') as string,
    full_name: formData.get('full_name') as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email:    parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Email ini sudah terdaftar. Silakan masuk.' }
    }
    return { error: 'Gagal mendaftar. Coba beberapa saat lagi.' }
  }

  return {
    success: true,
    message: 'Akun berhasil dibuat! Cek email Anda untuk verifikasi.',
  }
}

// ── FORGOT PASSWORD ──────────────────────────────────────────────
export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Masukkan email yang valid.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  })

  if (error) return { error: 'Gagal kirim email. Coba lagi.' }

  return {
    success: true,
    message: 'Link reset password sudah dikirim ke email Anda.',
  }
}
