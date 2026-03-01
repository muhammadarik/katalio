'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import AuthPanel from './AuthPanel'
import { forgotPasswordAction } from '@/app/(auth)/actions'

const initialState = { error: '', success: false, message: '' }

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState)

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <AuthPanel />

      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-cream">
        <div className="lg:hidden mb-10">
          <Link href="/" className="text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#1e1a15' }}>
            kata<span style={{ color: '#c4623a' }}>lio</span>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto">
          {/* Back */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 hover:underline"
            style={{ color: '#9e9488' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke masuk
          </Link>

          <div className="mb-8">
            <h1
              className="text-3xl font-black text-ink mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Lupa password?<br />
              <em style={{ fontStyle: 'italic', color: '#c4623a' }}>Tenang saja.</em>
            </h1>
            <p className="text-stone text-sm">
              Masukkan email Anda dan kami akan kirimkan link untuk reset password.
            </p>
          </div>

          {state?.success ? (
            <div
              className="p-6 rounded-2xl text-center"
              style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
            >
              <div className="text-4xl mb-3">📬</div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#166534' }}>
                Email terkirim!
              </h3>
              <p className="text-sm" style={{ color: '#15803d' }}>
                {state.message}
              </p>
              <p className="text-xs mt-3" style={{ color: '#9e9488' }}>
                Tidak menerima email?{' '}
                <button
                  onClick={() => window.location.reload()}
                  className="underline hover:text-ink"
                  style={{ color: '#c4623a' }}
                >
                  Kirim ulang
                </button>
              </p>
            </div>
          ) : (
            <>
              {state?.error && (
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-6 text-sm"
                  style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' }}
                >
                  <span>⚠️</span> {state.error}
                </div>
              )}

              <form action={formAction} className="space-y-4">
                <div>
                  <label htmlFor="email" className="label-text">Email terdaftar</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nama@email.com"
                    className="input"
                    autoFocus
                    disabled={isPending}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all duration-200"
                  style={{
                    background: isPending ? '#e8876a' : '#c4623a',
                    boxShadow: isPending ? 'none' : '0 4px 16px rgba(196,98,58,0.35)',
                    cursor: isPending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isPending ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Link Reset Password'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
