import { useAuth } from '@/hooks/use-auth'
import { LoginForm } from './LoginForm'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, signIn, signUp } = useAuth()

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario autenticado, mostrar el formulario de login
  if (!user) {
    return <LoginForm onSignIn={signIn} onSignUp={signUp} />
  }

  // Si hay usuario autenticado, mostrar el contenido protegido
  return <>{children}</>
} 