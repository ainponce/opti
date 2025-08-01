import { User } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useUserProfile } from '@/hooks/use-user-profile'
import { Logo } from '@/components/ui/logo'
import { BurgerMenu } from '@/components/navigation/BurgerMenu'

interface HeaderProps {
  onOpenBJJHistory?: () => void
  onOpenProfile?: () => void
}

export const Header = ({ onOpenBJJHistory, onOpenProfile }: HeaderProps) => {
  const { user } = useAuth()
  const { getDisplayName } = useUserProfile()

  const displayName = getDisplayName()

  return (
    <div className="flex items-center justify-between p-4 pt-safe bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-3 pt-4 flex-shrink-0">
        <Logo size="sm" />
        {user && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <User className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[200px]">{displayName}</span>
          </div>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-2 pt-4">
          {/* Show display name on mobile in a more compact way */}
          <div className="sm:hidden flex items-center gap-1 text-xs text-gray-400">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate max-w-[120px]">{displayName}</span>
          </div>

          {/* Burger Menu for mobile navigation */}
          <BurgerMenu
            onOpenBJJHistory={onOpenBJJHistory || (() => { })}
            onOpenProfile={onOpenProfile || (() => { })}
          />
        </div>
      )}
    </div>
  )
} 