"use client"

import { useState, useCallback, memo } from "react"
import { Badge } from "@/components/ui/badge"
import { useWorkout } from "@/hooks/use-workout"
import { useNutrition } from "@/hooks/use-nutrition"
import { DayNavigation } from "@/components/navigation/DayNavigation"
import { TabNavigation } from "@/components/navigation/TabNavigation"
import dynamic from "next/dynamic"

// Code splitting - lazy load heavy components
const WorkoutTab = dynamic(() => import("@/components/workout/WorkoutTab").then(mod => ({ default: mod.WorkoutTab })), {
  loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
})

const BJJTab = dynamic(() => import("@/components/workout/BJJTab").then(mod => ({ default: mod.BJJTab })), {
  loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
})

const BJJHistory = dynamic(() => import("@/components/workout/BJJHistory").then(mod => ({ default: mod.BJJHistory })), {
  loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
})

const NutritionTab = dynamic(() => import("@/components/nutrition/NutritionTab").then(mod => ({ default: mod.NutritionTab })), {
  loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
})

const ProfileTab = dynamic(() => import("@/components/profile/ProfileTab").then(mod => ({ default: mod.ProfileTab })), {
  loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
})

import { AuthGuard } from "@/components/auth/AuthGuard"
import { Header } from "@/components/auth/Header"
import { ToastContainer } from "@/components/ui/toast"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { BlockType } from "@/domain/types/workout"
import { nutritionData } from "@/data/nutrition-data"

// Componente principal - Single Responsibility Principle
function BJJGymRoutine() {
  const [activeTab, setActiveTab] = useState<"bjj" | "workout" | "nutrition">("bjj")
  const [showBJJHistory, setShowBJJHistory] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

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

  // Memoized utility functions to prevent re-renders
  const getRirBadge = useCallback((blockType: BlockType) => {
    const rir = workoutService.getRirValue(blockType)
    if (!rir) return null

    return (
      <Badge variant="outline" className="text-xs hover:bg-purple-500/10 hover:border-purple-400 transition-colors">
        RIR: {rir}
      </Badge>
    )
  }, [workoutService])

  const getSaciedadBadge = useCallback((saciedad: string) => {
    if (!saciedad) return null
    const colorClass = nutritionService.getSaciedadBadgeColor(saciedad as any)
    return (
      <Badge className={`text-xs ${colorClass}`}>
        {saciedad} saciedad
      </Badge>
    )
  }, [nutritionService])

  // Memoized handlers to prevent unnecessary re-renders
  const handleOpenBJJHistory = useCallback(() => {
    setShowProfile(false)
    setShowBJJHistory(true)
  }, [])

  const handleCloseBJJHistory = useCallback(() => {
    setShowBJJHistory(false)
  }, [])

  const handleOpenProfile = useCallback(() => {
    setShowBJJHistory(false)
    setShowProfile(true)
  }, [])

  const handleCloseProfile = useCallback(() => {
    setShowProfile(false)
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen-safe bg-gray-950 text-gray-100">
        <Header onOpenBJJHistory={handleOpenBJJHistory} onOpenProfile={handleOpenProfile} />
        <div className="container mx-auto px-4 py-6 max-w-md pb-safe">
        {showBJJHistory ? (
          <BJJHistory onBack={handleCloseBJJHistory} />
        ) : showProfile ? (
          <ProfileTab onBack={handleCloseProfile} />
        ) : (
          <>
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
          </>
        )}
        </div>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  )
}

// Memoized main component to prevent unnecessary re-renders
const MemoizedBJJGymRoutine = memo(BJJGymRoutine)

// Componente principal con protección de autenticación
export default function App() {
  return (
    <AuthGuard>
      <MemoizedBJJGymRoutine />
    </AuthGuard>
  )
}
