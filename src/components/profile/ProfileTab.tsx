import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useUserProfile } from '@/hooks/use-user-profile'
import { useToast } from '@/hooks/use-toast'

interface ProfileTabProps {
    onBack?: () => void
}

export const ProfileTab = ({ onBack }: ProfileTabProps) => {
    const { user, signOut } = useAuth()
    const { profile, loading, updateDisplayName } = useUserProfile()
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const handleDeleteAccount = async () => {
        if (!user) return

        setIsDeleting(true)
        try {
            // Here you would implement the actual account deletion logic
            // For now, we'll just sign out the user
            await signOut()
            toast({
                title: 'Cuenta eliminada',
                description: 'Tu cuenta ha sido eliminada exitosamente',
                variant: 'default',
            })
        } catch (error) {
            console.error('Error al eliminar cuenta:', error)
            toast({
                title: 'Error',
                description: 'No se pudo eliminar la cuenta. Inténtalo de nuevo.',
                variant: 'destructive',
            })
        } finally {
            setIsDeleting(false)
            setShowDeleteConfirm(false)
        }
    }

    const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Usuario'

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6">
            {/* Back Button */}
            {onBack && (
                <div className="mb-4">
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                </div>
            )}

            {/* Profile Header */}
            <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-1">{displayName}</h2>
                <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>

            {/* Profile Info Card */}
            <Card className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Información del Perfil</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre de Usuario
                        </label>
                        <p className="text-white">{displayName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <p className="text-white">{user?.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Miembro desde
                        </label>
                        <p className="text-white">
                            {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'N/A'}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Delete Account Section */}
            <Card className="p-6 bg-red-900/20 border-red-800/30">
                <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-lg font-medium text-red-400 mb-1">Zona de Peligro</h3>
                        <p className="text-gray-400 text-sm">
                            Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
                        </p>
                    </div>
                </div>

                {!showDeleteConfirm ? (
                    <Button
                        onClick={() => setShowDeleteConfirm(true)}
                        variant="destructive"
                        className="w-full"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar Cuenta
                    </Button>
                ) : (
                    <div className="space-y-3">
                        <p className="text-red-300 text-sm">
                            ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleDeleteAccount}
                                variant="destructive"
                                disabled={isDeleting}
                                className="flex-1"
                            >
                                {isDeleting ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <Trash2 className="w-4 h-4 mr-2" />
                                )}
                                {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
                            </Button>
                            <Button
                                onClick={() => setShowDeleteConfirm(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
} 