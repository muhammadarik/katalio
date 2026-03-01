'use client'

import { useActionState, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AuthPanel from './AuthPanel'
import { registerAction } from '@/app/(auth)/actions'
import { toSlug, isValidSlug } from '@/lib/utils'

const initialState = { error: '', success: false, message: '' }

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => { nameRef.current?.focus() }, [])

  // Password strength
  const strength = {
    hasMin:     password.length >= 8,
    hasUpper:   /[A-Z]/.test(password),
    hasNumber:  /[0-9]/.test(password),
  }
  const strengthScore = Object.values(strength).filter(Boolean).length
  const strengthLabel  = ['', 'Lemah', 'Sedang', 'Kuat'][strengthScore]
  const strengthColor  = ['', '#ef4444', '#d4920a', '#3a7d5c'][strengthScore]

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── LEFT PANEL ─────────────────────────────── */}
      <AuthPanel />

      {/* ── RIGHT: FORM ────────────────────────────── */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-cream overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link href="/" className="text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#1e1a15' }}>
            kata<span style={{ color: '#c4623a' }}>lio</span>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black text-ink mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Buat katalog<br />
              <em style={{ fontStyle: 'italic', color: '#c4623a' }}>bisnis Anda.</em>
            </h1>
            <p className="text-stone text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: '#c4623a' }}>
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Success state */}
          {state?.success ? (
            <div
              className="p-6 rounded-2xl text-center"
              style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
            >
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#166534' }}>
                Cek email Anda!
              </h3>
              <p className="text-sm" style={{ color: '#15803d' }}>
                {state.message}
              </p>
              <Link
                href="/login"
                className="inline-block mt-4 text-sm font-semibold hover:underline"
                style={{ color: '#c4623a' }}
              >
                Kembali ke halaman masuk →
              </Link>
            </div>
          ) : (
            <>
              {/* Error */}
              {state?.error && (
                <div
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl mb-6 text-sm"
                  style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' }}
                >
                  <span className="flex-shrink-0 mt-0.5">⚠️</span>
                  {state.error}
                </div>
              )}

              {/* Free plan benefit */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-6 text-sm"
                style={{ background: 'rgba(58,125,92,0.08)', border: '1px solid rgba(58,125,92,0.2)' }}
              >
                <span>🎉</span>
                <span style={{ color: '#3a7d5c', fontWeight: 600 }}>
                  Gratis selamanya — tidak perlu kartu kredit
                </span>
              </div>

              {/* Form */}
              <form action={formAction} className="space-y-4">
                {/* Nama lengkap */}
                <div>
                  <label htmlFor="full_name" className="label-text">Nama Lengkap</label>
                  <input
                    ref={nameRef}
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Nama Anda"
                    className="input"
                    disabled={isPending}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label-text">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nama@email.com"
                    className="input"
                    disabled={isPending}
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="label-text">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      placeholder="Minimal 8 karakter"
                      className="input pr-12"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                      style={{ color: '#9e9488' }}
                      tabIndex={-1}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  {/* Password strength */}
                  {password.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{
                              background: i <= strengthScore ? strengthColor : '#e5ddd0',
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs">
                        <div className="flex gap-3">
                          {[
                            { ok: strength.hasMin,    label: '8+ karakter' },
                            { ok: strength.hasUpper,  label: 'Huruf kapital' },
                            { ok: strength.hasNumber, label: 'Angka' },
                          ].map(r => (
                            <span key={r.label} style={{ color: r.ok ? '#3a7d5c' : '#9e9488' }}>
                              {r.ok ? '✓' : '○'} {r.label}
                            </span>
                          ))}
                        </div>
                        {strengthLabel && (
                          <span className="font-semibold" style={{ color: strengthColor }}>
                            {strengthLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all duration-200 mt-2"
                  style={{
                    background: isPending ? '#e8876a' : '#c4623a',
                    boxShadow: isPending ? 'none' : '0 4px 16px rgba(196,98,58,0.35)',
                    cursor: isPending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isPending ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Membuat akun...
                    </>
                  ) : (
                    <>
                      Buat Akun Gratis
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px" style={{ background: '#e5ddd0' }} />
                <span className="text-xs" style={{ color: '#9e9488' }}>atau</span>
                <div className="flex-1 h-px" style={{ background: '#e5ddd0' }} />
              </div>

              {/* Google SSO */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 border"
                style={{ background: '#fff', borderColor: '#e5ddd0', color: '#3d3730' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f7f4ef')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Daftar dengan Google
              </button>

              {/* Fine print */}
              <p className="text-center text-xs mt-6" style={{ color: '#9e9488' }}>
                Dengan mendaftar, Anda setuju dengan{' '}
                <Link href="/terms" className="underline hover:text-ink">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="/privacy" className="underline hover:text-ink">Kebijakan Privasi</Link>
                {' '}Katalio.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
