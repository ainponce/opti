import { Exercise, BlockType } from '@/domain/types/workout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Dumbbell, Timer } from 'lucide-react'
import { BLOCK_NAMES, BLOCK_ICON_NAMES } from '@/constants/workout-constants'
import { ExerciseCard } from './ExerciseCard'

// Función para obtener el icono del bloque - Single Responsibility Principle
const getBlockIcon = (blockType: BlockType) => {
    const iconName = BLOCK_ICON_NAMES[blockType]
    switch (iconName) {
        case 'Zap':
            return <Zap className="w-4 h-4" />
        case 'Dumbbell':
            return <Dumbbell className="w-4 h-4" />
        case 'Timer':
            return <Timer className="w-4 h-4" />
        default:
            return <Dumbbell className="w-4 h-4" />
    }
}

interface ExerciseBlockProps {
    blockType: BlockType
    exercises: Exercise[]
    completedExercises: Set<string>
    onToggleExercise: (exerciseId: string) => void
    formatReps: (exercise: Exercise) => string
    getRirBadge: (blockType: BlockType) => React.ReactNode
}

// Componente de bloque de ejercicios - Single Responsibility Principle
export const ExerciseBlock = ({
    blockType,
    exercises,
    completedExercises,
    onToggleExercise,
    formatReps,
    getRirBadge,
}: ExerciseBlockProps) => {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        {getBlockIcon(blockType)}
                        Bloque {BLOCK_NAMES[blockType]}
                    </CardTitle>
                    {getRirBadge(blockType)}
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {exercises.map((exercise, index) => {
                    const exerciseId = `${blockType}-${index}`
                    const isCompleted = completedExercises.has(exerciseId)

                    return (
                        <ExerciseCard
                            key={index}
                            exercise={exercise}
                            blockType={blockType}
                            exerciseIndex={index}
                            isCompleted={isCompleted}
                            onToggle={onToggleExercise}
                            formatReps={formatReps}
                        />
                    )
                })}
            </CardContent>
        </Card>
    )
} 