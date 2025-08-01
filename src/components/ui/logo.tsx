import { motion } from 'framer-motion'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <Image
        src="/icon.png"
        alt="Logo"
        width={48}
        height={48}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )
} 