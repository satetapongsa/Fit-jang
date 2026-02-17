import { useState } from 'react';
import { Button } from './ui/Button';
import { Plus, X } from 'lucide-react';

export type MealData = {
    id: string;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    timestamp: string;
}

interface MealCreatorProps {
    onSave: (meal: MealData) => void;
    onCancel: () => void;
}

export default function MealCreator({ onSave, onCancel }: MealCreatorProps) {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState(''); // Sugar/Carbs

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: Date.now().toString(),
            name,
            calories: Number(calories),
            protein: Number(protein),
            fat: Number(fat),
            carbs: Number(carbs),
            timestamp: new Date().toISOString()
        });
    };

    return (
        <div className="glass-card p-6 rounded-2xl w-full max-w-sm mx-auto animate-scale-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create Custom Meal</h3>
                <button onClick={onCancel} className="text-text-muted hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Meal Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Healthy Salad"
                        className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Calories (kcal)</label>
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="0"
                            className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Protein (g)</label>
                        <input
                            type="number"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            placeholder="0"
                            className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Fat (g)</label>
                        <input
                            type="number"
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                            placeholder="0"
                            className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Sugar/Carbs (g)</label>
                        <input
                            type="number"
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                            placeholder="0"
                            className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full mt-4" variant="primary" size="lg">
                    <Plus size={18} className="mr-2" /> Add Meal
                </Button>
            </form>
        </div>
    );
}
