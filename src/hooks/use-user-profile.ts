import { useState, useEffect } from 'react'
import { useAuth } from './use-auth'
import { UserProfileService } from '@/services/user-profile-service'
import { UserProfile, UpdateUserProfile } from '@/domain/types/user-profile'

export const useUserProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const userProfile = await UserProfileService.getOrCreateUserProfile(user.id, user.email || '')
        setProfile(userProfile)
      } catch (error) {
        console.error('Error al cargar perfil:', error)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const updateProfile = async (updates: UpdateUserProfile): Promise<{ success: boolean; error?: string }> => {
    if (!user || !profile) {
      return { success: false, error: 'Usuario no autenticado' }
    }

    try {
      const updatedProfile = await UserProfileService.updateUserProfile(user.id, updates)
      
      if (updatedProfile) {
        setProfile(updatedProfile)
        return { success: true }
      } else {
        return { success: false, error: 'Error al actualizar perfil' }
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      return { success: false, error: 'Error inesperado al actualizar perfil' }
    }
  }

  const updateDisplayName = async (displayName: string) => {
    return await updateProfile({ display_name: displayName })
  }

  const getDisplayName = () => {
    if (!profile) return user?.email?.split('@')[0] || 'Usuario'
    return profile.display_name || user?.email?.split('@')[0] || 'Usuario'
  }

  return {
    profile,
    loading,
    updateProfile,
    updateDisplayName,
    getDisplayName,
  }
} 