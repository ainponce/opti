import { supabase } from '@/lib/supabase'

export interface BJJTrainingEntry {
  id?: string
  user_id: string
  training_date: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface CreateBJJTrainingInput {
  training_date: string
  description: string
}

export class BJJHistoryService {
  /**
   * Guarda una nueva entrada de entrenamiento de BJJ
   */
  static async saveTraining(userId: string, input: CreateBJJTrainingInput): Promise<BJJTrainingEntry | null> {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    try {
      const { data, error } = await supabase
        .from('bjj_training_history')
        .insert({
          user_id: userId,
          training_date: input.training_date,
          description: input.description,
        })
        .select()
        .single()

      if (error) {
        console.error('Error saving BJJ training:', error)
        throw new Error('Failed to save training')
      }

      return data
    } catch (error) {
      console.error('Error in saveTraining:', error)
      throw error
    }
  }

  /**
   * Obtiene el historial de entrenamientos de BJJ de un usuario
   */
  static async getTrainingHistory(userId: string): Promise<BJJTrainingEntry[]> {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    try {
      const { data, error } = await supabase
        .from('bjj_training_history')
        .select('*')
        .eq('user_id', userId)
        .order('training_date', { ascending: false })

      if (error) {
        console.error('Error fetching BJJ training history:', error)
        throw new Error('Failed to fetch training history')
      }

      return data || []
    } catch (error) {
      console.error('Error in getTrainingHistory:', error)
      throw error
    }
  }

  /**
   * Obtiene una entrada específica de entrenamiento por fecha
   */
  static async getTrainingByDate(userId: string, trainingDate: string): Promise<BJJTrainingEntry | null> {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    try {
      const { data, error } = await supabase
        .from('bjj_training_history')
        .select('*')
        .eq('user_id', userId)
        .eq('training_date', trainingDate)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching BJJ training by date:', error)
        throw new Error('Failed to fetch training by date')
      }

      return data
    } catch (error) {
      console.error('Error in getTrainingByDate:', error)
      throw error
    }
  }

  /**
   * Actualiza una entrada existente de entrenamiento
   */
  static async updateTraining(userId: string, trainingDate: string, description: string): Promise<BJJTrainingEntry | null> {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    try {
      const { data, error } = await supabase
        .from('bjj_training_history')
        .update({
          description,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('training_date', trainingDate)
        .select()
        .single()

      if (error) {
        console.error('Error updating BJJ training:', error)
        throw new Error('Failed to update training')
      }

      return data
    } catch (error) {
      console.error('Error in updateTraining:', error)
      throw error
    }
  }

  /**
   * Elimina una entrada de entrenamiento
   */
  static async deleteTraining(userId: string, trainingDate: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    try {
      const { error } = await supabase
        .from('bjj_training_history')
        .delete()
        .eq('user_id', userId)
        .eq('training_date', trainingDate)

      if (error) {
        console.error('Error deleting BJJ training:', error)
        throw new Error('Failed to delete training')
      }
    } catch (error) {
      console.error('Error in deleteTraining:', error)
      throw error
    }
  }
} 