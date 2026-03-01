import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Masuk — Katalio',
  description: 'Masuk ke akun Katalio Anda',
}

export default function LoginPage() {
  return <LoginForm />
}
