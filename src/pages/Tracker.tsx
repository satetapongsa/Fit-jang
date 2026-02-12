import { useState } from 'react';
import Calendar from 'react-calendar';
import { Plus, Trash2, Utensils, GlassWater, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const calorieGoal = profile?.calorieGoal || 2500;

    // Local state for forms
    const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });
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
            protein: newMeal.protein ? Number(newMeal.protein) : 0,
            carbs: newMeal.carbs ? Number(newMeal.carbs) : 0,
            fat: newMeal.fat ? Number(newMeal.fat) : 0,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '' });
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
        <div className="p-5 space-y-6 animate-fade-in pb-32">
            {/* Header */}
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
                    Daily Tracker
                </h1>

                <div className="flex items-center gap-1 bg-surfaceHighlight/50 p-1 rounded-xl backdrop-blur-md">
                    <button onClick={() => shiftDate(-1)} className="p-2 hover:bg-white/10 rounded-lg text-primary transition-colors"><ChevronLeft size={16} /></button>
                    <button onClick={() => setShowCalendar(!showCalendar)} className="text-sm font-medium px-2 py-1 min-w-[80px] text-center">
                        {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </button>
                    <button onClick={() => shiftDate(1)} className="p-2 hover:bg-white/10 rounded-lg text-primary transition-colors"><ChevronRight size={16} /></button>

                    {/* Popover Calendar */}
                    {showCalendar && (
                        <div className="absolute top-14 right-4 z-50 glass-card p-4 rounded-2xl animate-fade-in">
                            <Calendar
                                onChange={(d) => {
                                    if (d instanceof Date) {
                                        setSelectedDate(d);
                                        setShowCalendar(false);
                                    }
                                }}
                                value={selectedDate}
                                className="react-calendar-dark text-sm border-none bg-transparent"
                            />
                        </div>
                    )}
                </div>
            </header>

            {/* Tabs */}
            <div className="flex p-1 bg-surfaceHighlight/30 rounded-2xl backdrop-blur-md relative overflow-hidden">
                {[
                    { id: 'food', icon: Utensils, label: 'Food' },
                    { id: 'water', icon: GlassWater, label: 'Water' },
                    { id: 'sleep', icon: Moon, label: 'Sleep' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex-1 flex flex-col items-center justify-center py-3 text-xs font-bold rounded-xl transition-all relative z-10",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-lg shadow-primary/25 translate-y-[-2px]"
                                : "text-text-muted hover:text-white"
                        )}
                    >
                        <tab.icon className={cn("w-5 h-5 mb-1", activeTab === tab.id ? "text-white" : "text-text-muted")} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="animate-slide-up">
                {activeTab === 'food' && (
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                                <Utensils size={120} />
                            </div>

                            <div className="relative z-10 text-center space-y-2">
                                <p className="text-sm text-text-muted font-bold uppercase tracking-wider">Calories Absorbed</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-red-500">
                                        {totalCalories}
                                    </span>
                                    <span className="text-sm text-text-muted mt-4">/ {calorieGoal} kcal</span>
                                </div>

                                <div className="w-full h-3 bg-surfaceHighlight rounded-full mt-4 overflow-hidden relative">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add Meal Form */}
                        <div className="glass p-4 rounded-2xl space-y-3">
                            <h3 className="font-bold text-sm text-white flex items-center gap-2"><Plus size={16} className="text-primary" /> Add Meal</h3>
                            <form onSubmit={handleAddMeal} className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        className="col-span-2 w-full bg-surfaceHighlight/50 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted/50"
                                        placeholder="Meal Name (e.g., Chicken Rice)"
                                        value={newMeal.name}
                                        onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                                    />
                                    <input
                                        className="w-full bg-surfaceHighlight/50 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted/50"
                                        placeholder="Calories"
                                        type="number"
                                        value={newMeal.calories}
                                        onChange={e => setNewMeal({ ...newMeal, calories: e.target.value })}
                                    />
                                    <input
                                        className="w-full bg-surfaceHighlight/50 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted/50"
                                        placeholder="Protein (g)"
                                        type="number"
                                        value={newMeal.protein}
                                        onChange={e => setNewMeal({ ...newMeal, protein: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="w-full bg-primary text-white rounded-xl py-2 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                                    <Plus size={16} /> Add Log
                                </button>
                            </form>
                        </div>

                        {/* Recent Meals */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-sm text-text-muted uppercase tracking-wider px-2">Recent Log</h3>
                            {currentData.meals.length > 0 ? (
                                currentData.meals.map((meal) => (
                                    <div key={meal.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-white/5 hover:border-primary/20 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 mt-1">
                                                <Utensils size={16} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{meal.name}</p>
                                                <p className="text-xs text-text-muted">{meal.time} • <span className="text-yellow-500">{meal.protein || 0}g Pro</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-orange-400">{meal.calories}</span>
                                            <button onClick={() => removeMeal(selectedDate, meal.id)} className="text-text-muted hover:text-red-500 p-2 rounded-full hover:bg-white/5 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-text-muted text-sm border border-dashed border-white/10 rounded-2xl">
                                    No meals logged today
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'water' && (
                    <div className="space-y-8 py-4">
                        <div className="relative group cursor-pointer flex justify-center" onClick={() => updateWater(selectedDate, 1)}>
                            <div className="relative z-10">
                                <GlassWater size={180} className={cn("transition-all duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]", currentWaterMl >= waterGoal ? "text-blue-500" : "text-blue-500/50")} />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <span className="text-3xl font-bold text-white drop-shadow-md">{(currentWaterMl / waterGoal * 100).toFixed(0)}%</span>
                                    <p className="text-xs text-blue-200 mt-1 font-bold tracking-widest">HYDRATED</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-5xl font-bold text-white">{currentWaterMl} <span className="text-lg text-text-muted font-medium">ml</span></h2>
                            <p className="text-text-muted">Goal: {waterGoal} ml</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => updateWater(selectedDate, -1)} disabled={currentWaterMl <= 0} className="py-4 rounded-2xl bg-surfaceHighlight border border-white/5 text-text-muted font-bold hover:bg-surfaceHighlight/80 active:scale-95 transition-all">
                                - 250ml
                            </button>
                            <button onClick={() => updateWater(selectedDate, 1)} className="py-4 rounded-2xl bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all">
                                + 250ml
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'sleep' && (
                    <div className="space-y-6">
                        <div className="p-8 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-3xl border border-indigo-500/30 text-center space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
                            <Moon className="w-16 h-16 text-indigo-400 mx-auto drop-shadow-[0_0_15px_rgba(129,140,248,0.6)]" />
                            <div>
                                <p className="text-6xl font-bold text-white">{currentData.sleepDuration}<span className="text-xl text-text-muted font-medium ml-1">h</span></p>
                                <p className="text-indigo-300 text-sm mt-2 font-medium">Auto-calculated duration</p>
                            </div>
                            <div className="flex justify-center gap-8 text-sm pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-text-muted mb-1">Bedtime</p>
                                    <p className="font-bold text-white">{currentData.sleepStart || '--:--'}</p>
                                </div>
                                <div>
                                    <p className="text-text-muted mb-1">Wake Up</p>
                                    <p className="font-bold text-white">{currentData.sleepEnd || '--:--'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl space-y-6">
                            <h3 className="font-bold text-white">Edit Schedule</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Bedtime</label>
                                    <input
                                        type="time"
                                        className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={sleepTimes.start}
                                        onChange={(e) => setSleepTimes(prev => ({ ...prev, start: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Wake Up</label>
                                    <input
                                        type="time"
                                        className="w-full bg-surfaceHighlight border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={sleepTimes.end}
                                        onChange={(e) => setSleepTimes(prev => ({ ...prev, end: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98]"
                                onClick={handleSleepUpdate}
                            >
                                Update Sleep Log
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
