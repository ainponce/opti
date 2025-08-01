import { supabase } from '@/lib/supabase'
import { UserProfile, CreateUserProfile, UpdateUserProfile } from '@/domain/types/user-profile'

export class UserProfileService {
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error al obtener perfil de usuario:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error inesperado al obtener perfil:', error)
      return null
    }
  }

  static async updateUserProfile(userId: string, updates: UpdateUserProfile): Promise<UserProfile | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error al actualizar perfil de usuario:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error inesperado al actualizar perfil:', error)
      return null
    }
  }

  static async createUserProfile(profile: CreateUserProfile): Promise<UserProfile | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profile)
        .select()
        .single()

      if (error) {
        console.error('Error al crear perfil de usuario:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error inesperado al crear perfil:', error)
      return null
    }
  }

  static async getOrCreateUserProfile(userId: string, email: string): Promise<UserProfile | null> {
    // Primero intentar obtener el perfil existente
    let profile = await this.getUserProfile(userId)
    
    // Si no existe, crear uno nuevo
    if (!profile) {
      profile = await this.createUserProfile({
        id: userId,
        email,
        display_name: email.split('@')[0], // Usar la primera parte del email como display_name por defecto
      })
    }

    return profile
  }
} 