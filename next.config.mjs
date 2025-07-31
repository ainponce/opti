/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de performance
  compress: true,
  poweredByHeader: false,
  
  // Optimizaciones de imágenes
  images: {
    unoptimized: true,
  },
  
  // Configuración de ESLint y TypeScript
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Optimizaciones de bundle
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig
