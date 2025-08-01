import { MealReference, MealType } from '@/domain/types/nutrition'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IngredientsDetail } from './IngredientsDetail'
import { useState } from 'react'

interface MealCardProps {
  mealType: MealType
  meal: string | MealReference
  getMealLabel: (mealId: string | MealReference, mealType: MealType) => string
  getSaciedadBadge: (saciedad: string) => React.ReactNode
  findMealOption: (mealId: string) => any
  getMealCalories: (mealId: string | MealReference) => number | null
  getMealIngredients: (mealId: string | MealReference) => any[] | null
}

// Componente de comida - Single Responsibility Principle
export const MealCard = ({
  mealType,
  meal,
  getMealLabel,
  getSaciedadBadge,
  findMealOption,
  getMealCalories,
  getMealIngredients,
}: MealCardProps) => {
  const [showIngredients, setShowIngredients] = useState(false)
  const getMealIcon = (type: MealType) => {
    switch (type) {
      case 'desayuno':
        return <span>☕</span>
      case 'merienda':
        return <span>🍎</span>
      default:
        return <span>🍽️</span>
    }
  }

  const getMealTitle = (type: MealType) => {
    switch (type) {
      case 'desayuno':
        return 'Desayuno'
      case 'almuerzo':
        return 'Almuerzo'
      case 'merienda':
        return 'Merienda'
      case 'cena':
        return 'Cena'
      default:
        return type
    }
  }

  const calories = getMealCalories(meal)
  const mealOption = typeof meal === "string" ? findMealOption(meal) : null
  const ingredientes = getMealIngredients(meal) || mealOption?.ingredientes

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {getMealIcon(mealType)}
          {getMealTitle(mealType)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium">
              {getMealLabel(meal, mealType)}
            </span>
            {calories && (
              <Badge variant="outline" className="text-xs flex items-center gap-1 hover:bg-orange-500/10 hover:border-orange-400 transition-colors">
                <span>🔥</span>
                {calories} cal
              </Badge>
            )}
          </div>

          {/* Mostrar saciedad si es una opción general */}
          {mealOption?.saciedad && getSaciedadBadge(mealOption.saciedad)}

          {/* Mostrar comentarios si es una opción general */}
          {mealOption?.comentarios && (
            <p className="text-xs text-gray-400 mt-2 mb-2">
              💡 {mealOption.comentarios}
            </p>
          )}

          {/* Mostrar nota si es una referencia */}
          {typeof meal === "object" && meal.nota && (
            <p className="text-xs text-gray-400 mt-2 mb-2">
              📝 {meal.nota}
            </p>
          )}

          {/* Mostrar badges para preparación */}
          {typeof meal === "object" && (
            <div className="flex gap-2 mt-2">
              {meal.prep_batch_freezar && (
                <Badge className="text-xs bg-blue-500/20 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200 transition-colors">
                  🧊 Freezar
                </Badge>
              )}
              {meal.sobras_ok && (
                <Badge className="text-xs bg-green-500/20 text-green-300 hover:bg-green-600/30 hover:text-green-200 transition-colors">
                  ♻️ Sobras OK
                </Badge>
              )}
            </div>
          )}

          {/* Detalle de ingredientes */}
          {ingredientes && (
            <div className="mt-2">
              <IngredientsDetail
                ingredientes={ingredientes}
                isOpen={showIngredients}
                onToggle={() => setShowIngredients(!showIngredients)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 