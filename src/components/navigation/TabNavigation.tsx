import { Button } from '@/components/ui/button'
import { Dumbbell, Utensils, Shirt } from 'lucide-react'

type TabType = "bjj" | "workout" | "nutrition"

interface TabNavigationProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

// Componente de navegación de pestañas - Single Responsibility Principle
export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    return (
        <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
                variant={activeTab === "bjj" ? "default" : "outline"}
                onClick={() => onTabChange("bjj")}
                className={`text-sm ${activeTab === "bjj"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
            >
                <Shirt className="w-4 h-4 mr-2" />
                BJJ
            </Button>
            <Button
                variant={activeTab === "workout" ? "default" : "outline"}
                onClick={() => onTabChange("workout")}
                className={`text-sm ${activeTab === "workout"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
            >
                <Dumbbell className="w-4 h-4 mr-2" />
                Gym
            </Button>
            <Button
                variant={activeTab === "nutrition" ? "default" : "outline"}
                onClick={() => onTabChange("nutrition")}
                className={`text-sm ${activeTab === "nutrition"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
            >
                <Utensils className="w-4 h-4 mr-2" />
                Nutrición
            </Button>
        </div>
    )
} 