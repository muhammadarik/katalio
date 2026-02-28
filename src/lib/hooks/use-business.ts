'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Business, Category, Product } from '@/types'

// Hook: ambil bisnis milik user yang login
export function useBusiness() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoading(false); return }

        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('owner_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') throw error
        setBusiness(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBusiness()
  }, [])

  return { business, loading, error }
}

// Hook: ambil semua produk bisnis
export function useProducts(businessId: string | undefined) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) { setLoading(false); return }

    async function fetchProducts() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('business_id', businessId)
        .order('sort_order', { ascending: true })

      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [businessId])

  return { products, loading, setProducts }
}

// Hook: ambil semua kategori bisnis
export function useCategories(businessId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) { setLoading(false); return }

    async function fetchCategories() {
      const supabase = createClient()
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('business_id', businessId)
        .order('sort_order', { ascending: true })

      setCategories(data || [])
      setLoading(false)
    }
    fetchCategories()
  }, [businessId])

  return { categories, loading, setCategories }
}
