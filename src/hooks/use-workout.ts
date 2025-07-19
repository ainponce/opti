import { useState, useCallback, useEffect, useMemo } from 'react'
import { WorkoutService } from '@/services/workout-service'
import { workoutData } from '@/data/workout-data'

// Hook de entrenamiento - Single Responsibility Principle
export const useWorkout = () => {
  const [selectedDay, setSelectedDay] = useState(0)
  const [showWarmup, setShowWarmup] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  // Crear el servicio una sola vez para evitar recreaciones
  const workoutService = useMemo(() => new WorkoutService(workoutData), [])

  // Detectar el día actual automáticamente al cargar la app
  useEffect(() => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    
    // Convertir a nuestro formato (0 = Lunes, 1 = Martes, ..., 6 = Domingo)
    let currentDayIndex = dayOfWeek - 1
    if (currentDayIndex === -1) currentDayIndex = 6 // Domingo
    
    // Asegurar que el índice esté dentro del rango válido (0-6)
    const maxDays = workoutService.getAllDays().length - 1
    if (currentDayIndex > maxDays) {
      currentDayIndex = 0 // Fallback al primer día si el índice es muy alto
    }
    
    setSelectedDay(currentDayIndex)
  }, [workoutService])

  const toggleExercise = useCallback((exerciseId: string) => {
    setCompletedExercises(prev => {
      const newCompleted = new Set(prev)
      if (newCompleted.has(exerciseId)) {
        newCompleted.delete(exerciseId)
      } else {
        newCompleted.add(exerciseId)
      }
      return newCompleted
    })
  }, [])

  const toggleWarmup = useCallback(() => {
    setShowWarmup(prev => !prev)
  }, [])

  const selectDay = useCallback((dayIndex: number) => {
    setSelectedDay(dayIndex)
  }, [])

  const currentDay = workoutService.getCurrentDay(selectedDay)
  const globalWarmup = workoutService.getGlobalWarmup()
  const intensityGuidelines = workoutService.getIntensityGuidelines()
  const units = workoutService.getUnits()
  const allDays = workoutService.getAllDays()

  return {
    // Estado
    selectedDay,
    showWarmup,
    completedExercises,
    
    // Acciones
    toggleExercise,
    toggleWarmup,
    selectDay,
    
    // Datos
    currentDay,
    globalWarmup,
    intensityGuidelines,
    units,
    allDays,
    
    // Servicio
    workoutService,
  }
} 