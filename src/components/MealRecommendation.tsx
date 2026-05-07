import { MEAL_RECOMMENDATIONS } from '../utils/mealData';
import { useState } from 'react';
import { Sparkles, RefreshCw, Dumbbell } from 'lucide-react';
import { Button } from './ui/Button';

interface MealRecommendationProps {
    onSelect: (meal: any) => void;
}

export default function MealRecommendation({ onSelect }: MealRecommendationProps) {
    const [currentMeal, setCurrentMeal] = useState(MEAL_RECOMMENDATIONS[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRandomize = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const remaining = MEAL_RECOMMENDATIONS.filter(m => m.name !== currentMeal.name);
            const random = remaining[Math.floor(Math.random() * remaining.length)];
            setCurrentMeal(random);
            setIsAnimating(false);
        }, 400);
    };

    return (
        <div className="glass-card rounded-[32px] overflow-hidden border border-primary/20 shadow-2xl transition-all duration-500">
            <div className="relative h-64 overflow-hidden flex items-center justify-center bg-surfaceHighlight">
                <img 
                    src={currentMeal.image} 
                    alt={currentMeal.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${isAnimating ? 'scale-110 blur-sm opacity-50' : 'scale-100'}`}
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
                    >
                        <RefreshCw className={`w-6 h-6 text-white ${isAnimating ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
                <div className="absolute bottom-4 left-6 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles size={12} /> Featured Fuel
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-bold shadow-lg">
                        High Protein
                    </span>
                </div>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
                <div>
                    <h3 className={`text-xl lg:text-2xl font-bold text-white transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        {currentMeal.name}
                    </h3>
                    <p className={`text-text-muted mt-2 text-sm leading-relaxed transition-all duration-300 delay-75 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        {currentMeal.description}
                    </p>
                </div>

                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 delay-150 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
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
