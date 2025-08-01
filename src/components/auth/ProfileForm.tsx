import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useUserProfile } from '@/hooks/use-user-profile'
import { useAuth } from '@/hooks/use-auth'

export const ProfileForm = () => {
    const { user } = useAuth()
    const { profile, updateDisplayName } = useUserProfile()
    const [displayName, setDisplayName] = useState(profile?.display_name || '')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    // Actualizar el estado local cuando cambie el perfil
    useEffect(() => {
        if (profile?.display_name) {
            setDisplayName(profile.display_name)
        }
    }, [profile?.display_name])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        const result = await updateDisplayName(displayName)

        if (result.success) {
            setMessage('Display name actualizado correctamente')
        } else {
            setMessage(`Error: ${result.error}`)
        }

        setIsLoading(false)
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Editar Perfil</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ingresa tu nombre de usuario"
                        required
                    />
                </div>

                {message && (
                    <div className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                        {message}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {isLoading ? 'Actualizando...' : 'Actualizar Nombre'}
                </Button>
            </form>

            <div className="mt-4 p-3 bg-gray-700 rounded-md">
                <p className="text-sm text-gray-300">
                    <strong>Email actual:</strong> {user?.email}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                    <strong>Display name actual:</strong> {profile?.display_name || 'No establecido'}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                    <strong>ID de usuario:</strong> {user?.id}
                </p>
            </div>
        </div>
    )
} 