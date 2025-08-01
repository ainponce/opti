import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, History, Dumbbell, Utensils, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useUserProfile } from '@/hooks/use-user-profile'
import { Logo } from '@/components/ui/logo'

interface BurgerMenuProps {
    onOpenBJJHistory: () => void
    onOpenProfile: () => void
}

export const BurgerMenu = ({ onOpenBJJHistory, onOpenProfile }: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { signOut, user } = useAuth()
    const { getDisplayName } = useUserProfile()

    const handleToggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleCloseMenu = () => {
        setIsOpen(false)
    }

    const handleOpenBJJHistory = () => {
        handleCloseMenu()
        onOpenBJJHistory()
    }

    const handleOpenProfile = () => {
        handleCloseMenu()
        onOpenProfile()
    }

    const handleSignOut = async () => {
        handleCloseMenu()
        await signOut()
    }

    return (
        <div className="relative">
            {/* Burger Button */}
            <Button
                onClick={handleToggleMenu}
                variant="ghost"
                size="sm"
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
                aria-label="Abrir menú"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Menu Overlay */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleCloseMenu}
                />

                {/* Menu Panel */}
                <div className={`absolute top-0 right-0 w-64 h-full bg-gray-900 border-l border-gray-800 shadow-xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4">
                        {/* Profile Header */}
                        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800 rounded-lg">
                            <Logo size="sm" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 text-sm text-white">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate font-medium">{getDisplayName()}</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>
                        </div>


                        {/* Menu Items */}
                        <div className="space-y-2">
                            <Button
                                onClick={handleOpenProfile}
                                variant="ghost"
                                className="w-full justify-start text-left p-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <Settings className="w-5 h-5 mr-3 text-blue-500" />
                                <div>
                                    <div className="font-medium">Perfil</div>
                                    <div className="text-xs text-gray-500">Gestionar cuenta y configuración</div>
                                </div>
                            </Button>

                            <Button
                                onClick={handleOpenBJJHistory}
                                variant="ghost"
                                className="w-full justify-start text-left p-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <History className="w-5 h-5 mr-3 text-blue-500" />
                                <div>
                                    <div className="font-medium">Historial de BJJ</div>
                                    <div className="text-xs text-gray-500">Ver entrenamientos anteriores</div>
                                </div>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left p-3 text-gray-500 hover:text-gray-400 hover:bg-gray-800 transition-all duration-200"
                                disabled
                            >
                                <Dumbbell className="w-5 h-5 mr-3 text-gray-600" />
                                <div>
                                    <div className="font-medium">Historial de Gym</div>
                                    <div className="text-xs text-gray-600">Próximamente</div>
                                </div>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left p-3 text-gray-500 hover:text-gray-400 hover:bg-gray-800 transition-all duration-200"
                                disabled
                            >
                                <Utensils className="w-5 h-5 mr-3 text-gray-600" />
                                <div>
                                    <div className="font-medium">Historial de Nutrición</div>
                                    <div className="text-xs text-gray-600">Próximamente</div>
                                </div>
                            </Button>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-gray-800 my-6"></div>

                        {/* Sign Out Button */}
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start text-left p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-red-800/30 transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            <div>
                                <div className="font-medium">Cerrar Sesión</div>
                                <div className="text-xs text-red-500">Salir de la aplicación</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 