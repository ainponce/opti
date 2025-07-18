import { BlockType } from '@/domain/types/workout'

// Constantes de entrenamiento - Single Responsibility Principle
export const BLOCK_NAMES: Record<BlockType, string> = {
  P: "Principal",
  A: "Auxiliar",
  F: "Finalizador",
}

export const BLOCK_COLORS: Record<BlockType, string> = {
  P: "bg-red-500/20 text-red-300 border-red-500/30",
  A: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  F: "bg-green-500/20 text-green-300 border-green-500/30",
}

// Los iconos se manejarán en el componente para evitar JSX en archivos .ts
export const BLOCK_ICON_NAMES: Record<BlockType, string> = {
  P: "Zap",
  A: "Dumbbell", 
  F: "Timer",
} 