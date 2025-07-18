import { useMemo } from 'react'
import { NutritionService } from '@/services/nutrition-service'
import { nutritionData } from '@/data/nutrition-data'

// Hook de nutrición - Single Responsibility Principle
export const useNutrition = (currentDayName: string) => {
  const nutritionService = useMemo(() => new NutritionService(nutritionData), [])

  const currentNutritionDay = useMemo(() => 
    nutritionService.getCurrentNutritionDay(currentDayName), 
    [nutritionService, currentDayName]
  )

  return {
    nutritionService,
    currentNutritionDay,
  }
} 