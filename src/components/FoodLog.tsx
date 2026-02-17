import { Search, Trash2, Edit2, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';
import { useData } from '../context/DataContext';
import type { Meal } from '../context/DataContext';

interface FoodLogProps {
    onSelectFood: (food: { name: string; calories: number; protein: number; fat: number; sugar: number }) => void;
    onCreateCustom: () => void;
    onEditCustom: (food: Meal) => void;
}

export default function FoodLog({ onSelectFood, onCreateCustom, onEditCustom }: FoodLogProps) {
    const [search, setSearch] = useState('');
    const { customFoods, removeCustomFood } = useData();

    // Combine mock suggestions with custom foods
    // For now, we prioritze custom foods
    const allFoods = customFoods;

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search your meals..."
                    className="w-full bg-surfaceHighlight border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                />
            </div>

            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Your Meals</h4>
                <Button variant="ghost" size="sm" onClick={onCreateCustom} className="text-primary hover:text-primary">
                    + Create New
                </Button>
            </div>

            <div className="space-y-3 pb-20">
                {allFoods.length === 0 && (
                    <div className="text-center text-text-muted py-8">
                        No meals yet. Create one to get started!
                    </div>
                )}
                {allFoods.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map((food) => (
                    <div
                        key={food.id}
                        className="glass-card p-4 rounded-xl flex justify-between items-center group relative overflow-hidden"
                    >
                        <div onClick={() => onSelectFood({
                            name: food.name,
                            calories: food.calories,
                            protein: food.protein || 0,
                            fat: food.fat || 0,
                            sugar: food.sugar || 0
                        })} className="flex-1 cursor-pointer">
                            <h5 className="font-medium group-hover:text-primary transition-colors">{food.name}</h5>
                            <span className="text-xs text-text-muted">{food.calories} kcal • P: {food.protein}g • F: {food.fat}g • S: {food.sugar}g</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEditCustom(food); }}
                                className="p-2 hover:bg-white/10 rounded-full text-text-muted hover:text-white transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeCustomFood(food.id); }}
                                className="p-2 hover:bg-red-500/10 rounded-full text-text-muted hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full h-8 w-8 ml-2"
                                onClick={() => onSelectFood({
                                    name: food.name,
                                    calories: food.calories,
                                    protein: food.protein || 0,
                                    fat: food.fat || 0,
                                    sugar: food.sugar || 0
                                })}
                            >
                                <Plus size={18} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
