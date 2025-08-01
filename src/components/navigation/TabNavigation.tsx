import { Button } from '@/components/ui/button'
import { memo } from 'react'

type TabType = "bjj" | "workout" | "nutrition"

interface TabNavigationProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

// Componente de navegación de pestañas - Single Responsibility Principle
const TabNavigationComponent = ({ activeTab, onTabChange }: TabNavigationProps) => {
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
                <span className="mr-2">🥋</span>
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
                <span className="mr-2">💪</span>
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
                <span className="mr-2">🥗</span>
                Nutrición
            </Button>
        </div>
    )
}

export const TabNavigation = memo(TabNavigationComponent) 