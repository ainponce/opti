// Tipos de dominio para nutrición - Single Responsibility Principle
export interface NutritionMetadata {
  pais: string
  criterios: string[]
  version: string
  notas_generales: string
}

export interface Ingredient {
  nombre: string
  cantidad: string
  calorias: number
  proteinas?: number
  carbohidratos?: number
  grasas?: number
}

export interface MealOption {
  id: string
  descripcion: string
  saciedad: string
  comentarios: string
  calorias?: number
  ingredientes?: Ingredient[]
}

export interface MealOptions {
  desayuno: MealOption[]
  merienda: MealOption[]
}

export interface MealReference {
  ref: string
  prep_batch_freezar?: boolean
  sobras_ok?: boolean
  nota: string
  calorias?: number
  ingredientes?: Ingredient[]
}

export interface WeeklyDay {
  desayuno: string
  almuerzo: string | MealReference
  merienda: string
  cena: string | MealReference
}

export interface WeeklyPlan {
  lunes: WeeklyDay
  martes: WeeklyDay
  miercoles: WeeklyDay
  jueves: WeeklyDay
  viernes: WeeklyDay
  sabado: WeeklyDay
  domingo: WeeklyDay
}

export interface ShoppingListItem {
  nombre: string
  cantidad_semanal: string
  cantidad_mensual: string
}

export interface ShoppingList {
  secos: ShoppingListItem[]
  proteinas: ShoppingListItem[]
  lacteos: ShoppingListItem[]
  verduras_frutas_estacion: ShoppingListItem[]
  despensa_extra: ShoppingListItem[]
}

export interface NutritionPlan {
  metadata: NutritionMetadata
  opciones_generales: MealOptions
  referencias_seleccionadas: Record<string, string>
  plan_semanal: WeeklyPlan
  listas_compras_basicas: ShoppingList
}

export type MealType = 'desayuno' | 'almuerzo' | 'merienda' | 'cena'
export type SaciedadLevel = '+' | '++' | '+++'
export type DayName = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo' 