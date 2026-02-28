import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Aktifkan untuk custom domain di plan Pro
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [{ type: 'host', value: '(?<slug>.+)\\.katalio\\.id' }],
  //       destination: '/:slug/:path*',
  //     },
  //   ]
  // },
}

export default nextConfig
