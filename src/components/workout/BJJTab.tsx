import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useBJJHistory } from '@/hooks/use-bjj-history'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface BJJTabProps {
    currentDay: any
}

// Componente de pestaña BJJ - Single Responsibility Principle
export const BJJTab = ({ currentDay }: BJJTabProps) => {
    const [description, setDescription] = useState('')
    const [isSaved, setIsSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessState, setShowSuccessState] = useState(false)
    const [hasUserEdited, setHasUserEdited] = useState(false)
    const { saveOrUpdateTraining, getTrainingByDate } = useBJJHistory()
    const { showSuccess, showError } = useToast()

    // Función para obtener la fecha actual en formato YYYY-MM-DD
    const getCurrentDate = () => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    // Cargar entrenamiento existente solo al montar el componente y si el usuario no ha editado
    useEffect(() => {
        if (!hasUserEdited) {
            const loadExistingTraining = async () => {
                const currentDate = getCurrentDate()
                try {
                    const existingTraining = await getTrainingByDate(currentDate)
                    if (existingTraining) {
                        setDescription(existingTraining.description)
                        setIsSaved(true)
                    }
                } catch (error) {
                    console.error('Error loading existing training:', error)
                }
            }

            loadExistingTraining()
        }
    }, [getTrainingByDate, hasUserEdited]) // Se ejecuta al montar y cuando cambia hasUserEdited

    const handleSave = async () => {
        if (!description.trim()) return

        setIsLoading(true)

        try {
            const currentDate = getCurrentDate()
            await saveOrUpdateTraining({
                training_date: currentDate,
                description: description.trim()
            })

            setIsSaved(true)
            setShowSuccessState(true)
            showSuccess('Entrenamiento guardado exitosamente')

            // Limpiar el input inmediatamente después de guardar
            setDescription('')
            setHasUserEdited(false) // Resetear el estado de edición del usuario

            // Resetear los estados visuales después de 2 segundos
            setTimeout(() => {
                setIsSaved(false)
                setShowSuccessState(false)
            }, 2000)
        } catch (error) {
            console.error('Error saving training:', error)
            showError('Error al guardar el entrenamiento. Intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-center mb-4">{currentDay.day_name}</h2>

            <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <span>🥋</span>
                        Entrenamiento BJJ
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="bjj-description" className="text-sm font-medium text-gray-300">
                            Describe tu entrenamiento de hoy:
                        </label>
                        <Textarea
                            id="bjj-description"
                            placeholder="¿Cómo te sentiste hoy? ¿Qué aprendiste? ¿Qué puedes mejorar? ¿Técnicas que practicaste? ¿Sparring? etc."
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setHasUserEdited(true) // Marcar que el usuario ha editado manualmente
                            }}
                            className={`min-h-[200px] bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-purple-500 transition-all duration-300 ${showSuccessState
                                ? 'border-green-500 bg-green-900/20'
                                : 'border-gray-700 focus:border-purple-500'
                                }`}
                        />
                    </div>

                    <Button
                        onClick={handleSave}
                        className={`w-full text-white disabled:cursor-not-allowed transition-all duration-300 ${showSuccessState
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800'
                            }`}
                        disabled={!description.trim() || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <span className="mr-2">
                                    {showSuccessState ? '✅' : '💾'}
                                </span>
                                {isSaved ? 'Guardado ✓' : 'Guardar Entrenamiento'}
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Tip informativo */}
            <div className="mt-4 p-3 bg-orange-900/20 border border-orange-800/30 rounded-lg">
                <div className="flex items-start gap-2">
                    <span className="text-orange-400 text-sm mt-0.5">💡</span>
                    <div className="text-sm text-orange-300">
                        <p className="font-medium mb-1">Tip:</p>
                        <p>Esta es una nota por día de entrenamiento. Para un análisis más efectivo, piensa bien antes de guardar. Si ya tienes una nota para hoy, se reemplazará con la nueva.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BJJTab