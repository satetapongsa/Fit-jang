import { useState } from 'react';
import Calendar from 'react-calendar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Trash2, Utensils, GlassWater, Moon, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import 'react-calendar/dist/Calendar.css';
import '../calendar-custom.css';

export default function Tracker() {
    const [activeTab, setActiveTab] = useState<'food' | 'water' | 'sleep'>('food');
    const { selectedDate, setSelectedDate, getDataForDate, addMeal, removeMeal, updateWater, updateSleep } = useData();
    const { profile } = useUser();
    const [showCalendar, setShowCalendar] = useState(false);

    const currentData = getDataForDate(selectedDate);
    const waterGoal = profile?.waterGoal || 3000;

    // Local state for forms
    const [newMeal, setNewMeal] = useState({ name: '', calories: '' });
    const [customWater, setCustomWater] = useState('');
    const [sleepTimes, setSleepTimes] = useState({
        start: currentData.sleepStart || '23:00',
        end: currentData.sleepEnd || '07:00'
    });

    const calculateSleepDuration = (start: string, end: string) => {
        const [startH, startM] = start.split(':').map(Number);
        const [endH, endM] = end.split(':').map(Number);

        if (isNaN(startH) || isNaN(endH)) return 0;

        let date1 = new Date(2000, 0, 1, startH, startM);
        let date2 = new Date(2000, 0, 1, endH, endM);

        if (date2 < date1) {
            date2.setDate(date2.getDate() + 1);
        }

        const diff = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60;
        return Number(diff.toFixed(1));
    };


    const handleAddMeal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMeal.name || !newMeal.calories) return;

        addMeal(selectedDate, {
            name: newMeal.name,
            calories: Number(newMeal.calories),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setNewMeal({ name: '', calories: '' });
    };

    const handleCustomWater = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = Number(customWater);
        if (amount && amount > 0) {
            // Convert ml to "units" (approx 250ml per glass for internal counter, or just track ML directly)
            // For simplicity, we stick to the existing context which tracks "units". 
            // Let's assume the context *actually* tracks units where 1 unit = 250ml.
            // To support exact ML, we'd need to refactor context to store total ML.
            // HACK: For now, we update by (amount / 250)
            updateWater(selectedDate, amount / 250);
            setCustomWater('');
        }
    };

    const handleSleepUpdate = () => {
        const duration = calculateSleepDuration(sleepTimes.start, sleepTimes.end);
        updateSleep(selectedDate, duration, sleepTimes.start, sleepTimes.end);
    };

    const totalCalories = currentData.meals.reduce((acc, curr) => acc + curr.calories, 0);

    const shiftDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const currentWaterMl = Math.round(currentData.waterIntake * 250);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in pb-24">
            {/* Date Navigation Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Daily Tracker</h1>

                <div className="flex items-center gap-2 bg-surfaceHighlight p-1 rounded-lg relative">
                    <Button variant="ghost" size="sm" onClick={() => shiftDate(-1)}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-surface rounded-md transition-colors min-w-[150px] justify-center"
                    >
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                    </button>

                    <Button variant="ghost" size="sm" onClick={() => shiftDate(1)}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>

                    {/* Popover Calendar */}
                    {showCalendar && (
                        <div className="absolute top-full right-0 mt-2 z-50 bg-surface border border-border p-4 rounded-xl shadow-xl w-[300px]">
                            <Calendar
                                onChange={(d) => {
                                    if (d instanceof Date) {
                                        setSelectedDate(d);
                                        setShowCalendar(false);
                                    }
                                }}
                                value={selectedDate}
                                className="react-calendar-dark text-sm"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 space-x-1 bg-surfaceHighlight rounded-xl">
                {[
                    { id: 'food', icon: Utensils, label: 'Nutrition' },
                    { id: 'water', icon: GlassWater, label: 'Water' },
                    { id: 'sleep', icon: Moon, label: 'Sleep' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === tab.id
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-text-muted hover:text-text hover:bg-surface"
                        )}
                    >
                        <tab.icon className="w-4 h-4 mr-2" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <Card className="min-h-[400px]">
                {activeTab === 'food' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Meals</h2>
                        </div>

                        {/* Add Meal Form */}
                        <form onSubmit={handleAddMeal} className="flex gap-2 items-end">
                            <Input
                                placeholder="Meal Name"
                                value={newMeal.name}
                                onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                            />
                            <Input
                                placeholder="Calories"
                                type="number"
                                value={newMeal.calories}
                                onChange={e => setNewMeal({ ...newMeal, calories: e.target.value })}
                            />
                            <Button type="submit" size="sm" className="mb-[2px] h-11">
                                <Plus className="w-4 h-4" />
                            </Button>
                        </form>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {currentData.meals.map((meal) => (
                                <div key={meal.id} className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
                                    <div>
                                        <p className="font-medium">{meal.name}</p>
                                        <p className="text-sm text-text-muted">{meal.time}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-primary">{meal.calories} kcal</span>
                                        <button
                                            onClick={() => removeMeal(selectedDate, meal.id)}
                                            className="text-text-muted hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {currentData.meals.length === 0 && (
                                <p className="text-center text-text-muted py-8">No meals logged for this day.</p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border mt-auto">
                            <div className="flex justify-between items-center">
                                <span className="text-text-muted">Total Calories</span>
                                <span className="text-2xl font-bold">{totalCalories} <span className="text-sm text-text-muted">/ 2500</span></span>
                            </div>
                            <div className="w-full h-2 bg-surfaceHighlight rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${Math.min((totalCalories / 2500) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'water' && (
                    <div className="flex flex-col items-center justify-center space-y-8 py-8 animate-fade-in w-full">
                        <div className="relative group cursor-pointer" onClick={() => updateWater(selectedDate, 1)}>
                            <GlassWater size={120} className={cn("transition-colors duration-300", currentWaterMl >= waterGoal ? "text-blue-500" : "text-blue-500/50")} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-text drop-shadow-md">{(currentWaterMl / waterGoal * 100).toFixed(0)}%</span>
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-bold">{currentWaterMl} ml</h2>
                            <p className="text-text-muted">Goal: {waterGoal} ml</p>
                        </div>

                        <div className="flex gap-4 w-full justify-center">
                            <Button variant="outline" onClick={() => updateWater(selectedDate, -1)} disabled={currentWaterMl <= 0}>
                                - 250ml
                            </Button>
                            <Button onClick={() => updateWater(selectedDate, 1)}>
                                + 250ml
                            </Button>
                        </div>

                        {/* Custom Water Input */}
                        <div className="w-full max-w-xs pt-4 border-t border-border">
                            <p className="text-sm text-center text-text-muted mb-2">Add Custom Amount</p>
                            <form onSubmit={handleCustomWater} className="flex gap-2">
                                <Input
                                    placeholder="ml"
                                    type="number"
                                    value={customWater}
                                    onChange={(e) => setCustomWater(e.target.value)}
                                />
                                <Button type="submit" size="sm" className="h-11">Add</Button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'sleep' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Sleep Cycle</h2>

                        <div className="p-6 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center space-y-2">
                            <Moon className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                            <p className="text-4xl font-bold">{currentData.sleepDuration}h</p>
                            <p className="text-text-muted">
                                From {currentData.sleepStart || '--:--'} to {currentData.sleepEnd || '--:--'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Bedtime</label>
                                <input
                                    type="time"
                                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={sleepTimes.start}
                                    onChange={(e) => setSleepTimes(prev => ({ ...prev, start: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Wake Up</label>
                                <input
                                    type="time"
                                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={sleepTimes.end}
                                    onChange={(e) => setSleepTimes(prev => ({ ...prev, end: e.target.value }))}
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
                            onClick={handleSleepUpdate}
                        >
                            Calculate & Save Sleep Log
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
