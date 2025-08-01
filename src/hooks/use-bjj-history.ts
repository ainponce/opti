import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './use-auth'
import { BJJHistoryService, BJJTrainingEntry, CreateBJJTrainingInput } from '@/services/bjj-history-service'

export const useBJJHistory = () => {
  const { user } = useAuth()
  const [trainingHistory, setTrainingHistory] = useState<BJJTrainingEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Carga el historial de entrenamientos
   */
  const loadTrainingHistory = useCallback(async () => {
    if (!user?.id) return

    setIsLoading(true)
    setError(null)

    try {
      const history = await BJJHistoryService.getTrainingHistory(user.id)
      setTrainingHistory(history)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading training history')
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  /**
   * Guarda un nuevo entrenamiento
   */
  const saveTraining = useCallback(async (input: CreateBJJTrainingInput) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    setIsLoading(true)
    setError(null)

    try {
      const savedTraining = await BJJHistoryService.saveTraining(user.id, input)
      
      if (savedTraining) {
        // Actualizar el historial local
        setTrainingHistory(prev => [savedTraining, ...prev])
      }
      
      return savedTraining
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error saving training'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  /**
   * Actualiza un entrenamiento existente
   */
  const updateTraining = useCallback(async (trainingDate: string, description: string) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    setIsLoading(true)
    setError(null)

    try {
      const updatedTraining = await BJJHistoryService.updateTraining(user.id, trainingDate, description)
      
      if (updatedTraining) {
        // Actualizar el historial local
        setTrainingHistory(prev => 
          prev.map(training => 
            training.training_date === trainingDate ? updatedTraining : training
          )
        )
      }
      
      return updatedTraining
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating training'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  /**
   * Elimina un entrenamiento
   */
  const deleteTraining = useCallback(async (trainingDate: string) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    setIsLoading(true)
    setError(null)

    try {
      await BJJHistoryService.deleteTraining(user.id, trainingDate)
      
      // Actualizar el historial local
      setTrainingHistory(prev => 
        prev.filter(training => training.training_date !== trainingDate)
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting training'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  /**
   * Obtiene un entrenamiento específico por fecha
   */
  const getTrainingByDate = useCallback(async (trainingDate: string) => {
    if (!user?.id) return null

    try {
      return await BJJHistoryService.getTrainingByDate(user.id, trainingDate)
    } catch (err) {
      console.error('Error getting training by date:', err)
      return null
    }
  }, [user?.id])

  /**
   * Guarda o actualiza un entrenamiento (upsert)
   */
  const saveOrUpdateTraining = useCallback(async (input: CreateBJJTrainingInput) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    try {
      // Primero intentar obtener el entrenamiento existente
      const existingTraining = await getTrainingByDate(input.training_date)
      
      if (existingTraining) {
        // Si existe, actualizar
        return await updateTraining(input.training_date, input.description)
      } else {
        // Si no existe, crear nuevo
        return await saveTraining(input)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error saving or updating training'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [user?.id, getTrainingByDate, updateTraining, saveTraining])

  // Cargar historial cuando el usuario cambie
  useEffect(() => {
    if (user?.id) {
      loadTrainingHistory()
    }
  }, [user?.id, loadTrainingHistory])

  return {
    trainingHistory,
    isLoading,
    error,
    saveTraining,
    updateTraining,
    deleteTraining,
    getTrainingByDate,
    saveOrUpdateTraining,
    loadTrainingHistory,
  }
} 