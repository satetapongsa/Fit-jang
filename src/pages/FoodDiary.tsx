import { useState } from 'react';
import FoodLog from '../components/FoodLog';
import MealCreator from '../components/MealCreator';
import MealRecommendation from '../components/MealRecommendation';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function FoodDiary() {
    const [mode, setMode] = useState<'log' | 'create'>('log');
    const { profile } = useUser();
    const [editingFood, setEditingFood] = useState<any>(null); // State for the food being edited
    const { addMeal, addCustomFood, updateCustomFood } = useData();

    if (!profile) return <Navigate to="/profile" replace />;
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const showSuccessMessage = (msg: string) => {
        setSuccessMsg(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleSelectFood = (food: { name: string; calories: number; protein: number; fat: number; sugar: number }) => {
        const now = new Date();
        const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        addMeal(now, {
            name: food.name,
            calories: food.calories,
            protein: food.protein,
            fat: food.fat,
            sugar: food.sugar,
            time: timeString
        });
        showSuccessMessage('Meal added to log!');
    };

    const handleSaveMeal = (meal: any) => {
        const foodData = {
            name: meal.name,
            calories: meal.calories,
            protein: meal.protein,
            fat: meal.fat,
            sugar: meal.carbs, // Mapping carbs input to sugar/carbs
            time: '00:00' // Placeholder for custom food definition
        };

        if (editingFood) {
            updateCustomFood(editingFood.id, foodData);
            showSuccessMessage('Meal updated!');
        } else {
            addCustomFood(foodData);
            showSuccessMessage('New meal created!');
        }

        setMode('log');
        setEditingFood(null);
    };

    const handleEditCustom = (food: any) => {
        setEditingFood({
            ...food,
            carbs: food.sugar // Map back for editing
        });
        setMode('create');
    };

    return (
        <div className="p-5 min-h-screen pb-32 animate-fade-in relative lg:px-10">
            <div className="max-w-7xl mx-auto">
            {showSuccess && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-md animate-fade-in flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {successMsg}
                </div>
            )}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <ChevronLeft className="text-white" />
                </Link>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Fuel & Nutrition</h1>
            </div>

            {mode === 'log' ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
                    <div className="space-y-6 order-2 xl:order-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-primary animate-pulse" size={24} />
                            <h2 className="text-xl lg:text-2xl font-bold text-white">Daily Recommendations</h2>
                        </div>
                        <MealRecommendation onSelect={handleSelectFood} />
                    </div>
                    <div className="order-1 xl:order-2">
                        <FoodLog
                            onSelectFood={handleSelectFood}
                            onCreateCustom={() => { setEditingFood(null); setMode('create'); }}
                            onEditCustom={handleEditCustom}
                        />
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-white text-center">
                        {editingFood ? 'Update Your Meal' : 'Create Custom Fuel'}
                    </h2>
                    <MealCreator
                        onSave={handleSaveMeal}
                        onCancel={() => { setMode('log'); setEditingFood(null); }}
                        initialData={editingFood}
                    />
                </div>
            )}
            </div>
        </div>
    );
}
