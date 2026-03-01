import type { Metadata } from 'next'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Lupa Password — Katalio',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
