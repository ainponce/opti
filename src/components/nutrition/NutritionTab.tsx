import { MealType } from '@/domain/types/nutrition'
import { MealCard } from './MealCard'
import { NutritionSubTabs } from './NutritionSubTabs'

interface NutritionTabProps {
    currentDay: any
    currentNutritionDay: any
    shoppingList: any
    getMealLabel: (mealId: string | any, mealType: MealType) => string
    getSaciedadBadge: (saciedad: string) => React.ReactNode
    findMealOption: (mealId: string) => any
    getMealCalories: (mealId: string | any) => number | null
    getMealIngredients: (mealId: string | any) => any[] | null
    getPrepTips: (limit?: number) => string[]
}

// Componente principal de nutrición - Single Responsibility Principle
export const NutritionTab = ({
    currentDay,
    currentNutritionDay,
    shoppingList,
    getMealLabel,
    getSaciedadBadge,
    findMealOption,
    getMealCalories,
    getMealIngredients,
    getPrepTips,
}: NutritionTabProps) => {
    if (!currentNutritionDay) {
        return <div className="text-center text-gray-400">No hay datos de nutrición para este día</div>
    }

    const mealTypes: MealType[] = ['desayuno', 'almuerzo', 'merienda', 'cena']

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-center mb-4">{currentDay.day_name}</h2>

            <NutritionSubTabs
                shoppingList={shoppingList}
                getPrepTips={getPrepTips}
            >
                <div className="space-y-4">
                    {mealTypes.map((mealType) => (
                        <MealCard
                            key={mealType}
                            mealType={mealType}
                            meal={currentNutritionDay[mealType]}
                            getMealLabel={getMealLabel}
                            getSaciedadBadge={getSaciedadBadge}
                            findMealOption={findMealOption}
                            getMealCalories={getMealCalories}
                            getMealIngredients={getMealIngredients}
                        />
                    ))}
                </div>
            </NutritionSubTabs>
        </div>
    )
} 