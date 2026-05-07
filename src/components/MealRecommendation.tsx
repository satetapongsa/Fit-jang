import { useState } from 'react';
import { Sparkles, RefreshCw, Info } from 'lucide-react';
import { Button } from './ui/Button';

export const MOCK_RECOMMENDATIONS = [
    {
        name: "Grilled Chicken Breast with Quinoa",
        calories: 450,
        protein: 42,
        fat: 10,
        carbs: 35,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop",
        description: "Lean protein powerhouse. Quinoa provides complex carbs for sustained energy."
    },
    {
        name: "Salmon Fillet with Steamed Broccoli",
        calories: 520,
        protein: 38,
        fat: 24,
        carbs: 8,
        image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&auto=format&fit=crop",
        description: "Rich in Omega-3 fatty acids for heart health and muscle inflammation reduction."
    },
    {
        name: "Lean Beef Stir-Fry",
        calories: 580,
        protein: 45,
        fat: 18,
        carbs: 42,
        image: "https://images.unsplash.com/photo-1512058560366-cd2427bb5871?w=800&auto=format&fit=crop",
        description: "Iron-rich beef paired with colorful veggies for a complete micronutrient profile."
    },
    {
        name: "Greek Yogurt Bowl with Berries & Nuts",
        calories: 320,
        protein: 28,
        fat: 12,
        carbs: 22,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
        description: "Perfect post-workout snack. High in protein and antioxidants."
    },
    {
        name: "Tempeh Buddha Bowl",
        calories: 480,
        protein: 32,
        fat: 16,
        carbs: 48,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
        description: "Plant-based protein rich in fiber and essential nutrients."
    }
];

interface MealRecommendationProps {
    onSelect: (meal: any) => void;
}

export default function MealRecommendation({ onSelect }: MealRecommendationProps) {
    const [currentMeal, setCurrentMeal] = useState(MOCK_RECOMMENDATIONS[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRandomize = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const remaining = MOCK_RECOMMENDATIONS.filter(m => m.name !== currentMeal.name);
            const random = remaining[Math.floor(Math.random() * remaining.length)];
            setCurrentMeal(random);
            setIsAnimating(false);
        }, 400);
    };

    return (
        <div className="glass-card rounded-[32px] overflow-hidden border border-primary/20 shadow-2xl transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={currentMeal.image} 
                    alt={currentMeal.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${isAnimating ? 'scale-110 blur-sm opacity-50' : 'scale-100'}`}
                />
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
