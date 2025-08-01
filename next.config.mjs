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
    dirs: ['app', 'src', 'components'],
  },
  typescript: {
    // Only ignore build errors in development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  // Optimizaciones de bundle
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },
  
  // Optimizaciones adicionales
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de salida
  output: 'standalone',
  
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
