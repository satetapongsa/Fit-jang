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
        <div className="w-full space-y-6">
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

            <div className="flex justify-between items-center px-1">
                <h4 className="text-lg font-bold text-white">Your Meals</h4>
            </div>

            <div className="space-y-3">
                {allFoods.length === 0 && (
                    <div className="text-center text-text-muted py-12 glass-card rounded-2xl border-dashed">
                        No custom meals yet.
                    </div>
                )}
                {allFoods.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map((food) => (
                    // ... existing meal card code ...
                    <div
                        key={food.id}
                        className="glass-card p-4 lg:p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group relative overflow-hidden"
                    >
                        <div onClick={() => onSelectFood({
                            name: food.name,
                            calories: food.calories,
                            protein: food.protein || 0,
                            fat: food.fat || 0,
                            sugar: food.sugar || 0
                        })} className="flex-1 cursor-pointer w-full">
                            <h5 className="font-bold text-lg group-hover:text-primary transition-colors">{food.name}</h5>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                                <span className="text-sm font-bold text-orange-400">{food.calories} kcal</span>
                                <span className="text-xs text-text-muted flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-text-muted" />
                                    P: {food.protein}g
                                </span>
                                <span className="text-xs text-text-muted flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-text-muted" />
                                    F: {food.fat}g
                                </span>
                                <span className="text-xs text-text-muted flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-text-muted" />
                                    C: {food.sugar}g
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEditCustom(food); }}
                                className="p-2.5 hover:bg-white/10 rounded-xl text-text-muted hover:text-white transition-colors"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeCustomFood(food.id); }}
                                className="p-2.5 hover:bg-red-500/10 rounded-xl text-text-muted hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                            <Button
                                variant="primary"
                                size="icon"
                                className="rounded-xl h-10 w-10 ml-2 shadow-lg shadow-primary/20"
                                onClick={() => onSelectFood({
                                    name: food.name,
                                    calories: food.calories,
                                    protein: food.protein || 0,
                                    fat: food.fat || 0,
                                    sugar: food.sugar || 0
                                })}
                            >
                                <Plus size={20} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Button 
                onClick={onCreateCustom} 
                className="w-full h-14 rounded-2xl bg-surfaceHighlight border border-white/10 text-primary font-bold hover:bg-white/5 transition-all shadow-lg"
            >
                <Plus size={20} className="mr-2" /> Create New Meal
            </Button>
        </div>
    );
}
