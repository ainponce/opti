import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Logo } from '@/components/ui/logo'

export const Header = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Logo size="sm" />
        {user && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <User className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
        )}
      </div>
      
      {user && (
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
        </Button>
      )}
    </div>
  )
} 