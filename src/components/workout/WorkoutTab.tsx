import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
    // Timer state
    const [showTimer, setShowTimer] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(180)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Iniciar timer
    const startTimer = () => {
        setSecondsLeft(180)
        setShowTimer(true)
    }

    // Lógica de cuenta regresiva
    useEffect(() => {
        if (!showTimer) return
        if (secondsLeft === 0) {
            setShowTimer(false)
            return
        }
        timerRef.current = setTimeout(() => {
            setSecondsLeft((s) => s - 1)
        }, 1000)
        return () => clearTimeout(timerRef.current as any)
    }, [showTimer, secondsLeft])

    // Cancelar timer
    const cancelTimer = () => {
        setShowTimer(false)
        setSecondsLeft(180)
        if (timerRef.current) clearTimeout(timerRef.current)
    }

    // Formatear tiempo mm:ss
    const formatTime = (s: number) => {
        const m = Math.floor(s / 60)
        const ss = s % 60
        return `${m}:${ss.toString().padStart(2, '0')}`
    }

    return (
        <div className="mb-6 relative">
            {/* Verificar si es día de descanso */}
            {Object.values(currentDay.blocks).every((exercises: any) => exercises.length === 0) ? (
                // Día de descanso - Solo mostrar mensaje
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6 pb-6">
                        <div className="text-center text-gray-400">
                            <p className="text-lg font-medium mb-2">Día de descanso</p>
                            <p className="text-sm">No hay ejercicios programados</p>
                            <p className="text-xs mt-2">¡Disfruta tu día libre!</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                // Día con ejercicios - Mostrar todo el contenido
                <>
                    <h2 className="text-xl font-semibold text-center mb-4">{currentDay.day_name}</h2>

                    {/* Botón circular de timer */}
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={startTimer}
                            className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg w-12 h-12 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                            title="Iniciar timer de pausa"
                        >
                            <span className="text-xl">⏱️</span>
                        </button>
                    </div>

                    {/* Warmup Toggle */}
                    <Button
                        variant="outline"
                        onClick={onToggleWarmup}
                        className="w-full mb-4 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    >
                        <span className="mr-2">🔥</span>
                        {showWarmup ? "Ocultar" : "Mostrar"} Calentamiento
                    </Button>

                    {/* Warmup Section */}
                    {showWarmup && <WarmupSection warmup={globalWarmup} />}

                    {/* Exercise Blocks */}
                    <div className="space-y-4">
                        {Object.entries(currentDay.blocks)
                            .sort(([a], [b]) => {
                                // Ordenar bloques: Principal (P) primero, luego Auxiliar (A), finalmente Finalizador (F)
                                const order = { P: 1, A: 2, F: 3 }
                                const orderA = order[a as keyof typeof order] || 999
                                const orderB = order[b as keyof typeof order] || 999
                                return orderA - orderB
                            })
                            .map(([blockType, exercises]) => (
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
                </>
            )}

            {/* Overlay Timer */}
            {showTimer && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80 transition-opacity animate-fade-in">
                    <div className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        {formatTime(secondsLeft)}
                    </div>
                    <button
                        onClick={cancelTimer}
                        className="mt-4 p-3 rounded-full bg-gray-700 hover:bg-red-600 text-white transition-colors"
                        title="Cancelar pausa"
                    >
                        <span className="text-2xl">❌</span>
                    </button>
                </div>
            )}
        </div>
    )
} 