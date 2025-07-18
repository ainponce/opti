import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, ShoppingCart } from 'lucide-react'
import { ShoppingListComponent } from './ShoppingList'

type NutritionSubTab = 'plan' | 'compras'

interface NutritionSubTabsProps {
    children: React.ReactNode
    shoppingList: any
    getPrepTips: (limit?: number) => string[]
}

// Componente de subpestañas de nutrición - Single Responsibility Principle
export const NutritionSubTabs = ({
    children,
    shoppingList,
    getPrepTips
}: NutritionSubTabsProps) => {
    const [activeTab, setActiveTab] = useState<NutritionSubTab>('plan')

    const tabs = [
        { id: 'plan' as NutritionSubTab, label: 'Plan Diario', icon: '🍽️' },
        { id: 'compras' as NutritionSubTab, label: 'Lista de Compras', icon: '🛒' }
    ]

    return (
        <div className="space-y-4">
            {/* Navegación de subpestañas */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenido de las subpestañas */}
            <div className="space-y-4">
                {activeTab === 'plan' && (
                    <>
                        {children}

                        {/* Tips */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4" />
                                    Tips de Preparación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {getPrepTips(3).map((tip, index) => (
                                    <div key={index} className="text-xs text-gray-400">
                                        • {tip.replace(/_/g, " ")}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </>
                )}

                {activeTab === 'compras' && (
                    <ShoppingListComponent shoppingList={shoppingList} />
                )}
            </div>
        </div>
    )
} 