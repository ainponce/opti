import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { BlockType } from '@/domain/types/workout'
import { ExerciseBlock } from './ExerciseBlock'
import { WarmupSection } from './WarmupSection'

interface WorkoutTabProps {
    currentDay: any
    showWarmup: boolean
    completedExercises: Set<string>
    globalWarmup: any
    intensityGuidelines: any
    units: any
    onToggleWarmup: () => void
    onToggleExercise: (exerciseId: string) => void
    formatReps: (exercise: any) => string
    getRirBadge: (blockType: BlockType) => React.ReactNode
}

// Componente principal de entrenamiento - Single Responsibility Principle
export const WorkoutTab = ({
    currentDay,
    showWarmup,
    completedExercises,
    globalWarmup,
    intensityGuidelines,
    units,
    onToggleWarmup,
    onToggleExercise,
    formatReps,
    getRirBadge,
}: WorkoutTabProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-center mb-4">{currentDay.day_name}</h2>

            {/* Warmup Toggle */}
            <Button
                variant="outline"
                onClick={onToggleWarmup}
                className="w-full mb-4 bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
                <Clock className="w-4 h-4 mr-2" />
                {showWarmup ? "Ocultar" : "Mostrar"} Calentamiento
            </Button>

            {/* Warmup Section */}
            {showWarmup && <WarmupSection warmup={globalWarmup} />}

            {/* Exercise Blocks */}
            <div className="space-y-4">
                {Object.entries(currentDay.blocks).map(([blockType, exercises]) => (
                    <ExerciseBlock
                        key={blockType}
                        blockType={blockType as BlockType}
                        exercises={exercises as any[]}
                        completedExercises={completedExercises}
                        onToggleExercise={onToggleExercise}
                        formatReps={formatReps}
                        getRirBadge={getRirBadge}
                    />
                ))}
            </div>

            {/* Guidelines */}
            <Card className="mt-6 bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Pautas de Intensidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="text-xs text-gray-400">
                        <strong>Pausas:</strong> {intensityGuidelines.pausas}
                    </div>
                    <div className="text-xs text-gray-400">
                        <strong>RIR:</strong> {units.rir_definition}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 