import { MEAL_RECOMMENDATIONS, type MealCategory } from '../utils/mealData';
import { useState, useMemo } from 'react';
import { Sparkles, RefreshCw, Dumbbell, Leaf, Utensils, Milk, Cookie } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

interface MealRecommendationProps {
    onSelect: (meal: any) => void;
}

const CATEGORIES: { id: MealCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'All', icon: Utensils },
    { id: 'meat', label: 'Meat', icon: Dumbbell },
    { id: 'vegetarian', label: 'Veggie', icon: Leaf },
    { id: 'vegan', label: 'Vegan', icon: Leaf },
    { id: 'dairy', label: 'Dairy', icon: Milk },
    { id: 'snack', label: 'Snacks', icon: Cookie },
];

export default function MealRecommendation({ onSelect }: MealRecommendationProps) {
    const [selectedCategory, setSelectedCategory] = useState<MealCategory>('all');
    
    const filteredMeals = useMemo(() => {
        if (selectedCategory === 'all') return MEAL_RECOMMENDATIONS;
        return MEAL_RECOMMENDATIONS.filter(m => m.category === selectedCategory);
    }, [selectedCategory]);

    const [currentMeal, setCurrentMeal] = useState(filteredMeals[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRandomize = () => {
        if (filteredMeals.length <= 1) return;
        setIsAnimating(true);
        setTimeout(() => {
            const remaining = filteredMeals.filter(m => m.name !== currentMeal.name);
            const random = remaining[Math.floor(Math.random() * remaining.length)];
            setCurrentMeal(random);
            setIsAnimating(false);
        }, 400);
    };

    const handleCategoryChange = (cat: MealCategory) => {
        setSelectedCategory(cat);
        const meals = cat === 'all' ? MEAL_RECOMMENDATIONS : MEAL_RECOMMENDATIONS.filter(m => m.category === cat);
        setCurrentMeal(meals[0]);
    };

    return (
        <div className="glass-card rounded-[32px] overflow-hidden border border-primary/20 shadow-2xl transition-all duration-500">
            {/* Category Selector */}
            <div className="px-6 pt-6 pb-2 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max pb-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border",
                                selectedCategory === cat.id
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                                    : "bg-white/5 text-text-muted border-white/5 hover:border-white/20"
                            )}
                        >
                            <cat.icon size={14} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-64 overflow-hidden flex items-center justify-center bg-surfaceHighlight">
                <img 
                    src={currentMeal.image} 
                    alt={currentMeal.name}
                    className={cn(
                        "w-full h-full object-cover transition-all duration-500",
                        isAnimating ? "scale-110 blur-sm opacity-50" : "scale-100"
                    )}
                    onError={(e) => {
                        e.currentTarget.classList.add('hidden');
                        e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                />
                <div className="fallback-icon hidden text-primary/20">
                    <Dumbbell size={100} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                    <Button 
                        onClick={handleRandomize}
                        variant="glass" 
                        size="icon" 
                        className="rounded-full h-12 w-12 bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/20"
                        disabled={filteredMeals.length <= 1}
                    >
                        <RefreshCw className={cn("w-6 h-6 text-white", isAnimating ? "animate-spin" : "")} />
                    </Button>
                </div>
                <div className="absolute bottom-4 left-6 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold flex items-center gap-1 shadow-lg capitalize">
                        <Sparkles size={12} /> {currentMeal.category} Fuel
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-bold shadow-lg">
                        High Protein
                    </span>
                </div>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
                <div>
                    <h3 className={cn(
                        "text-xl lg:text-2xl font-bold text-white transition-all duration-300",
                        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                    )}>
                        {currentMeal.name}
                    </h3>
                    <p className={cn(
                        "text-text-muted mt-2 text-sm leading-relaxed transition-all duration-300 delay-75",
                        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                    )}>
                        {currentMeal.description}
                    </p>
                </div>

                <div className={cn(
                    "grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 delay-150",
                    isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                )}>
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-xl font-bold text-white">{currentMeal.protein}g</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Protein</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-xl font-bold text-orange-400">{currentMeal.calories}</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Kcal</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-xl font-bold text-blue-400">{currentMeal.carbs}g</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Carbs</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-xl font-bold text-rose-400">{currentMeal.fat}g</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Fat</p>
                    </div>
                </div>

                <Button 
                    onClick={() => onSelect(currentMeal)}
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                >
                    Add to Fuel Log
                </Button>
            </div>
        </div>
    );
}
