import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Package, Beef, Milk, Carrot, Store } from 'lucide-react'
import { ShoppingList } from '@/domain/types/nutrition'
import { useState } from 'react'

interface ShoppingListComponentProps {
    shoppingList: ShoppingList
}

// Componente de lista de compras - Single Responsibility Principle
export const ShoppingListComponent = ({ shoppingList }: ShoppingListComponentProps) => {
    const [periodo, setPeriodo] = useState<'semanal' | 'mensual'>('semanal')

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'secos':
                return <Package className="w-4 h-4" />
            case 'proteinas':
                return <Beef className="w-4 h-4" />
            case 'lacteos':
                return <Milk className="w-4 h-4" />
            case 'verduras_frutas_estacion':
                return <Carrot className="w-4 h-4" />
            case 'despensa_extra':
                return <Store className="w-4 h-4" />
            default:
                return <ShoppingCart className="w-4 h-4" />
        }
    }

    const getCategoryTitle = (category: string) => {
        switch (category) {
            case 'secos':
                return 'Secos y Granos'
            case 'proteinas':
                return 'Proteínas'
            case 'lacteos':
                return 'Lácteos'
            case 'verduras_frutas_estacion':
                return 'Verduras y Frutas'
            case 'despensa_extra':
                return 'Despensa'
            default:
                return category
        }
    }

    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Lista de Compras Básicas
                </CardTitle>
                <div className="mt-2 flex gap-2">
                    <button
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${periodo === 'semanal' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setPeriodo('semanal')}
                    >
                        Por semana
                    </button>
                    <button
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${periodo === 'mensual' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setPeriodo('mensual')}
                    >
                        Por mes
                    </button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(shoppingList).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            {getCategoryIcon(category)}
                            {getCategoryTitle(category)}
                        </div>
                        <ul className="space-y-1 ml-6">
                            {(items as any[]).map((item: any, index: number) => (
                                <li key={index} className="text-xs text-gray-400 flex items-start gap-2">
                                    <span className="text-gray-500 mt-1">•</span>
                                    <span className="flex-1">{item.nombre}</span>
                                    <span className="text-blue-400 font-semibold">
                                        {periodo === 'semanal' ? item.cantidad_semanal : item.cantidad_mensual}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
} 