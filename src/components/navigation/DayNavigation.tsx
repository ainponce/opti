import { Button } from '@/components/ui/button'
import { useEffect, useState, memo } from 'react'

interface DayNavigationProps {
    days: any[]
    selectedDay: number
    onSelectDay: (dayIndex: number) => void
}

// Componente de navegación de días - Single Responsibility Principle
const DayNavigationComponent = ({ days, selectedDay, onSelectDay }: DayNavigationProps) => {
    const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null)

    // Detectar el día actual
    useEffect(() => {
        const today = new Date()
        const dayOfWeek = today.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

        // Convertir a nuestro formato (0 = Lunes, 1 = Martes, ..., 6 = Domingo)
        let todayIndex = dayOfWeek - 1
        if (todayIndex === -1) todayIndex = 6 // Domingo

        setCurrentDayIndex(todayIndex)
    }, [])

    return (
        <div className="grid grid-cols-7 gap-1 mb-6">
            {days.map((day, index) => {
                const isSelected = selectedDay === index
                const isToday = currentDayIndex === index

                return (
                    <Button
                        key={index}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSelectDay(index)}
                        className={`text-[10px] relative ${isSelected
                            ? "bg-blue-600 hover:bg-blue-700"
                            : isToday
                                ? "bg-green-600 hover:bg-green-700 border-green-500"
                                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        {day.day_name.slice(0, 3)}
                        {isToday && !isSelected && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                        )}
                    </Button>
                )
            })}
        </div>
    )
}

export const DayNavigation = memo(DayNavigationComponent) 