import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBJJHistory } from '@/hooks/use-bjj-history'
import { BJJTrainingEntry } from '@/services/bjj-history-service'
import { Calendar, Clock, Edit, Trash2, Loader2, ArrowLeft } from 'lucide-react'

interface BJJHistoryProps {
    onBack: () => void
}

export const BJJHistory = ({ onBack }: BJJHistoryProps) => {
    const { trainingHistory, isLoading, error, deleteTraining } = useBJJHistory()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDeleteTraining = async (training: BJJTrainingEntry) => {
        if (!training.training_date) return

        setDeletingId(training.id || '')

        try {
            await deleteTraining(training.training_date)
        } catch (error) {
            console.error('Error deleting training:', error)
        } finally {
            setDeletingId(null)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    if (isLoading && trainingHistory.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <Button onClick={onBack} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button onClick={onBack} variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h1 className="text-xl font-semibold text-white">Historial de BJJ</h1>
                </div>
                <div className="text-sm text-gray-400">
                    {trainingHistory.length} entrenamiento{trainingHistory.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Training History List */}
            {trainingHistory.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No hay entrenamientos registrados</p>
                            <p className="text-sm">Comienza a registrar tus entrenamientos de BJJ</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {trainingHistory.map((training) => (
                        <Card key={training.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <CardTitle className="text-base text-white">
                                            {formatDate(training.training_date)}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-gray-500" />
                                        <span className="text-xs text-gray-500">
                                            {training.created_at && formatTime(training.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-gray-300 text-sm leading-relaxed">
                                    {training.description}
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        {training.updated_at && training.updated_at !== training.created_at && (
                                            <span>Actualizado: {formatTime(training.updated_at)}</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => handleDeleteTraining(training)}
                                            variant="ghost"
                                            size="sm"
                                            disabled={deletingId === training.id}
                                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                        >
                                            {deletingId === training.id ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-3 h-3" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BJJHistory