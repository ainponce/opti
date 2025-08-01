import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Si no hay cliente de Supabase, no hacer nada
    if (!supabase) {
      setLoading(false)
      return
    }

    // Obtener sesión inicial
    const getSession = async () => {
      if (!supabase) return
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error al obtener sesión:', error)
        }
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error('Error inesperado al obtener sesión:', error)
        setLoading(false)
      }
    }

    getSession()

    // Escuchar cambios de autenticación
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Cliente de Supabase no disponible' } }
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      return { error }
    } catch (error) {
      return { error: { message: 'Error inesperado al iniciar sesión' } }
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Cliente de Supabase no disponible' } }
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    if (!supabase) {
      return { error: { message: 'Cliente de Supabase no disponible' } }
    }
    
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }
} 