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
    <div className="flex items-center justify-between p-4 pt-safe bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-3 pt-4 flex-shrink-0">
        <Logo size="sm" />
        {user && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <User className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[200px]">{user.email}</span>
          </div>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-2 pt-4">
          {/* Show email on mobile in a more compact way */}
          <div className="sm:hidden flex items-center gap-1 text-xs text-gray-400">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate max-w-[120px]">{user.email}</span>
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300 flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 