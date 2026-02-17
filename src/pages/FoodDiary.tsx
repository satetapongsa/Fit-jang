import { useState } from 'react';
import FoodLog from '../components/FoodLog';
import MealCreator from '../components/MealCreator';
import { useData } from '../context/DataContext';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FoodDiary() {
    const [mode, setMode] = useState<'log' | 'create'>('log');
    const [editingFood, setEditingFood] = useState<any>(null); // State for the food being edited
    const { addMeal, addCustomFood, updateCustomFood } = useData();
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
        <div className="p-5 min-h-screen bg-background pb-32 animate-fade-in relative">
            {showSuccess && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-md animate-fade-in flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {successMsg}
                </div>
            )}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <ChevronLeft className="text-white" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Food Diary</h1>
            </div>

            {mode === 'log' ? (
                <FoodLog
                    onSelectFood={handleSelectFood}
                    onCreateCustom={() => { setEditingFood(null); setMode('create'); }}
                    onEditCustom={handleEditCustom}
                />
            ) : (
                <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4 text-white">
                        {editingFood ? 'Edit Meal' : 'Create New Meal'}
                    </h2>
                    <MealCreator
                        onSave={handleSaveMeal}
                        onCancel={() => { setMode('log'); setEditingFood(null); }}
                        initialData={editingFood}
                    />
                </div>
            )}
        </div>
    );
}
