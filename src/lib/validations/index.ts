import { z } from 'zod'

export const createBusinessSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama bisnis minimal 3 karakter')
    .max(60, 'Nama bisnis maksimal 60 karakter'),
  slug: z
    .string()
    .min(3, 'Slug minimal 3 karakter')
    .max(30, 'Slug maksimal 30 karakter')
    .regex(/^[a-z0-9][a-z0-9-]*$/, 'Slug hanya boleh huruf kecil, angka, dan strip'),
  description: z.string().max(300, 'Deskripsi maksimal 300 karakter').optional(),
  city: z.string().max(50).optional(),
  whatsapp_number: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{7,10}$/, 'Nomor WhatsApp tidak valid')
    .optional()
    .or(z.literal('')),
})

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama produk minimal 2 karakter')
    .max(100, 'Nama produk maksimal 100 karakter'),
  description: z.string().max(500, 'Deskripsi maksimal 500 karakter').optional(),
  price: z
    .number({ invalid_type_error: 'Harga harus berupa angka' })
    .min(0, 'Harga tidak boleh negatif')
    .max(999_999_999, 'Harga terlalu besar'),
  original_price: z.number().min(0).optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  badge: z
    .enum(['Terlaris', 'Baru', 'Promo', 'Habis', ''])
    .optional()
    .nullable(),
  is_available: z.boolean().default(true),
  is_featured: z.boolean().default(false),
})

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Nama kategori minimal 2 karakter')
    .max(40, 'Nama kategori maksimal 40 karakter'),
  emoji: z.string().max(2).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

export const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung huruf kapital')
    .regex(/[0-9]/, 'Password harus mengandung angka'),
  full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
})

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>
export type CreateProductInput = z.infer<typeof createProductSchema>
export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
