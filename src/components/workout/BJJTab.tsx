import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface BJJTabProps {
    currentDay: any
}

// Componente de pestaña BJJ - Single Responsibility Principle
export const BJJTab = ({ currentDay }: BJJTabProps) => {
    const [description, setDescription] = useState('')
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = () => {
        // Aquí se podría implementar la lógica para guardar en localStorage o base de datos
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000) // Reset después de 2 segundos
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
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[200px] bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <Button
                        onClick={handleSave}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={!description.trim()}
                    >
                        <span className="mr-2">💾</span>
                        {isSaved ? 'Guardado ✓' : 'Guardar Entrenamiento'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
} 