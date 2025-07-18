import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Scale, Flame, Zap, Beef, Droplets, ChevronDown } from 'lucide-react'
import { Ingredient } from '@/domain/types/nutrition'
import { motion, AnimatePresence } from 'framer-motion'

interface IngredientsDetailProps {
    ingredientes: Ingredient[]
    isOpen: boolean
    onToggle: () => void
}

// Componente de ingredientes detallados - Single Responsibility Principle
export const IngredientsDetail = ({
    ingredientes,
    isOpen,
    onToggle
}: IngredientsDetailProps) => {
    if (!ingredientes || ingredientes.length === 0) {
        return null
    }

    const totalCalorias = ingredientes.reduce((sum, ing) => sum + ing.calorias, 0)
    const totalProteinas = ingredientes.reduce((sum, ing) => sum + (ing.proteinas || 0), 0)
    const totalCarbohidratos = ingredientes.reduce((sum, ing) => sum + (ing.carbohidratos || 0), 0)
    const totalGrasas = ingredientes.reduce((sum, ing) => sum + (ing.grasas || 0), 0)

    return (
        <Card className="bg-gray-800 border-gray-700 mt-2 mb-2">
            <CardHeader
                className="cursor-pointer hover:bg-gray-750 transition-colors p-3"
                onClick={onToggle}
            >
                <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Scale className="w-4 h-4" />
                        Ingredientes Detallados
                    </span>
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.span>
                </CardTitle>
            </CardHeader>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <CardContent className="space-y-3">
                            {/* Resumen nutricional */}
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex items-center gap-1 text-orange-300">
                                    <Flame className="w-3 h-3" />
                                    <span>{totalCalorias} cal</span>
                                </div>
                                <div className="flex items-center gap-1 text-blue-300">
                                    <Beef className="w-3 h-3" />
                                    <span>{totalProteinas}g prot</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-300">
                                    <Zap className="w-3 h-3" />
                                    <span>{totalCarbohidratos}g carb</span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-300">
                                    <Droplets className="w-3 h-3" />
                                    <span>{totalGrasas}g grasas</span>
                                </div>
                            </div>

                            {/* Lista de ingredientes */}
                            <div className="space-y-2">
                                {ingredientes.map((ingrediente, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-gray-750 rounded text-xs">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-200">{ingrediente.nombre}</div>
                                            <div className="text-gray-400">{ingrediente.cantidad}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs hover:bg-orange-500/10 hover:border-orange-400 transition-colors">
                                                {ingrediente.calorias} cal
                                            </Badge>
                                            {ingrediente.proteinas && (
                                                <span className="text-blue-300 text-xs">{ingrediente.proteinas}g</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
} 