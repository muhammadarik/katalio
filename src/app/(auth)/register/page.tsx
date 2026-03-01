import type { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Daftar Gratis — Katalio',
  description: 'Buat akun Katalio gratis dan mulai buat katalog digital bisnis Anda',
}

export default function RegisterPage() {
  return <RegisterForm />
}
