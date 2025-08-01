"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useWorkout } from "@/hooks/use-workout"
import { useNutrition } from "@/hooks/use-nutrition"
import { DayNavigation } from "@/components/navigation/DayNavigation"
import { TabNavigation } from "@/components/navigation/TabNavigation"
import { WorkoutTab } from "@/components/workout/WorkoutTab"
import { BJJTab } from "@/components/workout/BJJTab"
import { NutritionTab } from "@/components/nutrition/NutritionTab"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { Header } from "@/components/auth/Header"
import { BlockType } from "@/domain/types/workout"
import { nutritionData } from "@/data/nutrition-data"

// Componente principal - Single Responsibility Principle
function BJJGymRoutine() {
  const [activeTab, setActiveTab] = useState<"bjj" | "workout" | "nutrition">("bjj")

  // Hooks personalizados - Dependency Inversion Principle
  const {
    selectedDay,
    showWarmup,
    completedExercises,
    toggleExercise,
    toggleWarmup,
    selectDay,
    currentDay,
    globalWarmup,
    intensityGuidelines,
    units,
    allDays,
    workoutService,
  } = useWorkout()

  const { nutritionService, currentNutritionDay } = useNutrition(currentDay?.day_name || 'Lunes')

  // Funciones utilitarias - Single Responsibility Principle
  const getRirBadge = (blockType: BlockType) => {
    const rir = workoutService.getRirValue(blockType)
    if (!rir) return null

    return (
      <Badge variant="outline" className="text-xs hover:bg-purple-500/10 hover:border-purple-400 transition-colors">
        RIR: {rir}
      </Badge>
    )
  }

  const getSaciedadBadge = (saciedad: string) => {
    if (!saciedad) return null
    const colorClass = nutritionService.getSaciedadBadgeColor(saciedad as any)
    return (
      <Badge className={`text-xs ${colorClass}`}>
        {saciedad} saciedad
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Day Navigation */}
        <DayNavigation
          days={allDays}
          selectedDay={selectedDay}
          onSelectDay={selectDay}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content based on active tab */}
        {currentDay ? (
          activeTab === "bjj" ? (
            <BJJTab currentDay={currentDay} />
          ) : activeTab === "workout" ? (
            <WorkoutTab
              currentDay={currentDay}
              showWarmup={showWarmup}
              completedExercises={completedExercises}
              globalWarmup={globalWarmup}
              intensityGuidelines={intensityGuidelines}
              units={units}
              onToggleWarmup={toggleWarmup}
              onToggleExercise={toggleExercise}
              formatReps={workoutService.formatExerciseReps.bind(workoutService)}
              getRirBadge={getRirBadge}
            />
          ) : (
            <NutritionTab
              currentDay={currentDay}
              currentNutritionDay={currentNutritionDay}
              shoppingList={nutritionData.listas_compras_basicas}
              getMealLabel={nutritionService.getMealLabel.bind(nutritionService)}
              getSaciedadBadge={getSaciedadBadge}
              findMealOption={nutritionService.findMealOptionById.bind(nutritionService)}
              getMealCalories={nutritionService.getMealCalories.bind(nutritionService)}
              getMealIngredients={nutritionService.getMealIngredients.bind(nutritionService)}
              getPrepTips={nutritionService.getPrepTips.bind(nutritionService)}
            />
          )
        ) : (
          <div className="text-center text-gray-400 mt-8">
            <p>No se encontró información para el día seleccionado.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente principal con protección de autenticación
export default function App() {
  return (
    <AuthGuard>
      <BJJGymRoutine />
    </AuthGuard>
  )
}
