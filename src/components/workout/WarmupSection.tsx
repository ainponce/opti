import { GlobalWarmup } from '@/domain/types/workout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

interface WarmupSectionProps {
    warmup: GlobalWarmup
}

// Componente de calentamiento - Single Responsibility Principle
export const WarmupSection = ({ warmup }: WarmupSectionProps) => {
    return (
        <Card className="mb-6 bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {warmup.name}
                </CardTitle>
                <p className="text-sm text-gray-400">
                    {warmup.rounds} rondas • {warmup.notes}
                </p>
            </CardHeader>
            <CardContent className="space-y-3">
                {warmup.elements.map((element, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">{element.exercise}</span>
                        <span className="text-xs text-gray-400">
                            {element.duration || element.prescription || `${element.reps} reps`}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
} 