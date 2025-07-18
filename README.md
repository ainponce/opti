# 🥋 OPTI

Aplicación de entrenamiento y nutrición para BJJ (Brazilian Jiu-Jitsu) construida con Next.js, TypeScript y Tailwind CSS.

## 🏗️ Arquitectura Modular

Este proyecto sigue los principios de **Clean Code** y **SOLID** para mantener un código limpio, mantenible y escalable.

### 📁 Estructura del Proyecto

```
src/
├── domain/           # 🧠 Lógica de dominio
│   └── types/        # Tipos TypeScript para entidades
├── data/             # 📊 Datos y configuraciones
├── services/         # 🔧 Lógica de negocio
├── hooks/            # 🎣 Hooks personalizados
├── components/       # 🧩 Componentes UI
│   ├── workout/      # Componentes de entrenamiento
│   ├── nutrition/    # Componentes de nutrición
│   └── navigation/   # Componentes de navegación
└── constants/        # 📋 Constantes y configuraciones
```

### 🎯 Principios SOLID Aplicados

#### 1. **Single Responsibility Principle (SRP)**
- Cada clase/componente tiene una única responsabilidad
- `WorkoutService`: Maneja solo la lógica de entrenamiento
- `NutritionService`: Maneja solo la lógica de nutrición
- `ExerciseCard`: Renderiza solo un ejercicio individual

#### 2. **Open/Closed Principle (OCP)**
- Los servicios son extensibles sin modificar código existente
- Nuevos tipos de ejercicios se pueden agregar sin cambiar la lógica base
- Nuevos tipos de comidas se pueden agregar sin modificar servicios

#### 3. **Liskov Substitution Principle (LSP)**
- Los tipos de dominio son intercambiables
- `BlockType` puede ser extendido sin romper la funcionalidad existente

#### 4. **Interface Segregation Principle (ISP)**
- Interfaces pequeñas y específicas
- `Exercise`, `MealOption`, `WorkoutDay` son interfaces específicas

#### 5. **Dependency Inversion Principle (DIP)**
- Los hooks dependen de abstracciones (servicios)
- Los componentes dependen de props tipadas
- Fácil testing y mockeo

### 🧩 Componentes Principales

#### **Entrenamiento**
- `WorkoutTab`: Pestaña principal de entrenamiento
- `ExerciseBlock`: Bloque de ejercicios por tipo
- `ExerciseCard`: Tarjeta individual de ejercicio
- `WarmupSection`: Sección de calentamiento

#### **Nutrición**
- `NutritionTab`: Pestaña principal de nutrición
- `NutritionSubTabs`: Subpestañas para plan y lista de compras
- `MealCard`: Tarjeta de comida individual con calorías e ingredientes
- `IngredientsDetail`: Detalle expandible de ingredientes con macronutrientes
- `ShoppingListComponent`: Lista de compras organizada

#### **Navegación**
- `DayNavigation`: Navegación entre días
- `TabNavigation`: Navegación entre pestañas

### 🔧 Servicios

#### **WorkoutService**
```typescript
class WorkoutService {
  formatExerciseReps(exercise: Exercise): string
  getRirValue(blockType: BlockType): string | number | null
  getCurrentDay(selectedDay: number): WorkoutDay
  // ...
}
```

#### **NutritionService**
```typescript
class NutritionService {
  getMealLabel(mealId: string | ComplexMeal, mealType: MealType): string
  getSaciedadBadgeColor(saciedad: SaciedadLevel): string
  getPrepTips(limit?: number): string[]
  // ...
}
```

### 🎣 Hooks Personalizados

#### **useWorkout**
- Maneja el estado del entrenamiento
- Proporciona funciones para interactuar con ejercicios
- Gestiona el estado de completado

#### **useNutrition**
- Maneja el estado de nutrición
- Proporciona datos del día actual
- Gestiona la lógica de comidas

### 📊 Tipos de Dominio

#### **Entrenamiento**
```typescript
interface Exercise {
  name: string
  reps_scheme?: number[]
  sets?: number
  reps?: string | number
  // ...
}

interface WorkoutDay {
  day_name: string
  day_code: string
  warmup: string
  blocks: ExerciseBlock
}
```

#### **Nutrición**
```typescript
interface Ingredient {
  nombre: string
  cantidad: string
  calorias: number
  proteinas?: number
  carbohidratos?: number
  grasas?: number
}

interface MealOption {
  id: string
  descripcion: string
  saciedad: string
  comentarios: string
  calorias?: number
  ingredientes?: Ingredient[]
}

interface MealReference {
  ref: string
  prep_batch_freezar?: boolean
  sobras_ok?: boolean
  nota: string
  calorias?: number
}

interface WeeklyPlan {
  lunes: WeeklyDay
  martes: WeeklyDay
  // ... resto de días
}
```

### 🍽️ Características de Nutrición

- **Plan semanal completo** con desayuno, almuerzo, merienda y cena
- **Valores calóricos** para todas las comidas
- **Ingredientes detallados** con gramaje y macronutrientes (proteínas, carbohidratos, grasas)
- **Subpestañas organizadas**: Plan Diario y Lista de Compras
- **Tips de preparación** y batch cooking
- **Lista de compras organizada** por categorías (secos, proteínas, lácteos, etc.)
- **Criterios argentinos**: barato, rápido, rico
- **Opciones de freezado** y reutilización de sobras

## 🚀 Características

- ✅ **Entrenamiento estructurado** con bloques P/A/F
- ✅ **Plan nutricional argentino** con criterios barato/rápido/rico
- ✅ **Valores calóricos** para todas las comidas
- ✅ **Ingredientes detallados** con gramaje y macronutrientes
- ✅ **Lista de compras** en subpestaña separada
- ✅ **Tips de preparación** y batch cooking
- ✅ **Detección automática del día actual** - No más búsqueda manual
- ✅ **Seguimiento de progreso** con ejercicios completados
- ✅ **Interfaz responsive** optimizada para móviles
- ✅ **Arquitectura escalable** siguiendo principios SOLID
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para estilos consistentes

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos
- **Radix UI** - Componentes base

## 📱 Uso

1. **Detección automática**: La app detecta automáticamente el día actual y se abre en la pestaña correcta
2. **Navegación por días**: El día actual se resalta en verde con un indicador amarillo
3. **Cambio de pestañas**: Alterna entre entrenamiento y nutrición
4. **Seguimiento**: Marca ejercicios como completados
5. **Calentamiento**: Muestra/oculta la rutina de calentamiento

## 🔄 Mantenimiento

### Agregar Nuevos Ejercicios
1. Actualizar `src/data/workout-data.ts`
2. Los tipos ya están definidos en `src/domain/types/workout.ts`

### Agregar Nuevas Comidas
1. Actualizar `src/data/nutrition-data.ts`
2. Los tipos ya están definidos en `src/domain/types/nutrition.ts`

### Modificar Lógica de Negocio
1. Actualizar servicios en `src/services/`
2. Los componentes se actualizarán automáticamente

## 🧪 Testing

La arquitectura modular facilita el testing:
- Servicios pueden ser mockeados fácilmente
- Componentes son puros y testeables
- Hooks pueden ser testeados independientemente

## 📈 Beneficios de la Arquitectura

1. **Mantenibilidad**: Código organizado y fácil de entender
2. **Escalabilidad**: Fácil agregar nuevas funcionalidades
3. **Testabilidad**: Componentes y servicios aislados
4. **Reutilización**: Componentes y hooks reutilizables
5. **Type Safety**: TypeScript en toda la aplicación
6. **Separación de Responsabilidades**: Cada módulo tiene un propósito claro 