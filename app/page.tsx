"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useWorkout } from "@/hooks/use-workout"
import { useNutrition } from "@/hooks/use-nutrition"
import { DayNavigation } from "@/components/navigation/DayNavigation"
import { TabNavigation } from "@/components/navigation/TabNavigation"
import { WorkoutTab } from "@/components/workout/WorkoutTab"
import { NutritionTab } from "@/components/nutrition/NutritionTab"
import { BlockType } from "@/domain/types/workout"
import { nutritionData } from "@/data/nutrition-data"

// Componente principal - Single Responsibility Principle
export default function BJJGymRoutine() {
  const [activeTab, setActiveTab] = useState<"workout" | "nutrition">("workout")

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

  const { nutritionService, currentNutritionDay } = useNutrition(currentDay.day_name)

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
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">BJJ Training</h1>
        </div>

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
        {activeTab === "workout" ? (
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
        )}
      </div>
    </div>
  )
}
