import { NutritionPlan, MealType, MealReference, MealOption, SaciedadLevel, DayName } from '@/domain/types/nutrition'

// Servicio de nutrición - Single Responsibility Principle
export class NutritionService {
  constructor(private nutritionPlan: NutritionPlan) {}

  // Open/Closed Principle - Extensible sin modificar
  getMealLabel(mealId: string | MealReference, mealType: MealType): string {
    if (typeof mealId === "object") {
      return this.getMealReferenceLabel(mealId)
    }

    // Buscar en opciones generales
    const generalOption = this.findGeneralMealOption(mealId)
    if (generalOption) {
      return generalOption.descripcion
    }

    // Buscar en referencias seleccionadas
    const reference = this.nutritionPlan.referencias_seleccionadas[mealId]
    if (reference) {
      return reference
    }

    return this.formatMealId(mealId)
  }

  getCurrentNutritionDay(dayName: string): any {
    const dayKey = this.getDayKey(dayName)
    return this.nutritionPlan.plan_semanal[dayKey as DayName]
  }

  getSaciedadBadgeColor(saciedad: SaciedadLevel): string {
    const colors = {
      "+": "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-600/30 hover:text-yellow-200",
      "++": "bg-orange-500/20 text-orange-300 hover:bg-orange-600/30 hover:text-orange-200",
      "+++": "bg-red-500/20 text-red-300 hover:bg-red-600/30 hover:text-red-200",
    }
    return colors[saciedad] || "bg-gray-500/20 text-gray-300 hover:bg-gray-600/30 hover:text-gray-200"
  }

  getPrepTips(limit?: number): string[] {
    // Convertir las notas generales en tips
    const tips = [this.nutritionPlan.metadata.notas_generales]
    return limit ? tips.slice(0, limit) : tips
  }

  findMealOptionById(mealId: string): MealOption | undefined {
    return this.findGeneralMealOption(mealId)
  }

  getMealCalories(mealId: string | MealReference): number | null {
    if (typeof mealId === "object") {
      return mealId.calorias || null
    }

    const generalOption = this.findGeneralMealOption(mealId)
    return generalOption?.calorias || null
  }

  getMealIngredients(mealId: string | MealReference): any[] | null {
    if (typeof mealId === "object") {
      return mealId.ingredientes || null
    }

    const generalOption = this.findGeneralMealOption(mealId)
    return generalOption?.ingredientes || null
  }

  getMealReference(mealId: string): MealReference | null {
    if (typeof mealId === "object") {
      return mealId
    }

    // Buscar en el plan semanal
    for (const day of Object.values(this.nutritionPlan.plan_semanal)) {
      if (day.almuerzo && typeof day.almuerzo === "object" && day.almuerzo.ref === mealId) {
        return day.almuerzo
      }
      if (day.cena && typeof day.cena === "object" && day.cena.ref === mealId) {
        return day.cena
      }
    }

    return null
  }

  // Dependency Inversion Principle - Depende de abstracciones
  private findGeneralMealOption(mealId: string): MealOption | undefined {
    const allOptions = [
      ...this.nutritionPlan.opciones_generales.desayuno,
      ...this.nutritionPlan.opciones_generales.merienda,
    ]
    return allOptions.find((option) => option.id === mealId)
  }

  private getMealReferenceLabel(mealRef: MealReference): string {
    const reference = this.nutritionPlan.referencias_seleccionadas[mealRef.ref]
    return reference || mealRef.ref
  }

  private getDayKey(dayName: string): string {
    const dayMap: Record<string, DayName> = {
      'Lunes': 'lunes',
      'Martes': 'martes',
      'Miércoles': 'miercoles',
      'Jueves': 'jueves',
      'Viernes': 'viernes',
      'Sábado': 'sabado',
      'Domingo': 'domingo'
    }
    return dayMap[dayName] || 'lunes'
  }

  private formatMealId(mealId: string): string {
    return mealId.replace(/_/g, " ")
  }
} 