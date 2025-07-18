import { Exercise, BlockType } from '@/domain/types/workout'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'
import { BLOCK_COLORS } from '@/constants/workout-constants'

interface ExerciseCardProps {
    exercise: Exercise
    blockType: BlockType
    exerciseIndex: number
    isCompleted: boolean
    onToggle: (exerciseId: string) => void
    formatReps: (exercise: Exercise) => string
}

// Componente de ejercicio - Single Responsibility Principle
export const ExerciseCard = ({
    exercise,
    blockType,
    exerciseIndex,
    isCompleted,
    onToggle,
    formatReps,
}: ExerciseCardProps) => {
    const exerciseId = `${blockType}-${exerciseIndex}`
    const blockColor = BLOCK_COLORS[blockType]

    return (
        <div
            onClick={() => onToggle(exerciseId)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${isCompleted
                ? "bg-green-500/10 border-green-500/30"
                : `${blockColor} hover:opacity-80`
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className={`font-medium ${isCompleted ? "line-through text-gray-500" : ""}`}>
                    {exercise.name}
                </h4>
                <Badge variant="secondary" className="text-xs bg-gray-800 hover:bg-gray-700 transition-colors">
                    {formatReps(exercise)}
                </Badge>
            </div>
            {exercise.note && (
                <p className="text-xs text-gray-400 mt-1">
                    <Info className="w-3 h-3 inline mr-1" />
                    {exercise.note}
                </p>
            )}
        </div>
    )
} 