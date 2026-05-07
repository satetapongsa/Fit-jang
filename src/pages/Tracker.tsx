import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Plus, Trash2, Utensils, GlassWater, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import WaterWave from '../components/WaterWave';
import 'react-calendar/dist/Calendar.css';
import '../calendar-custom.css';

export default function Tracker() {
    const [activeTab, setActiveTab] = useState<'food' | 'water' | 'sleep'>('food');
    const { profile } = useUser();
    const { selectedDate, setSelectedDate, getDataForDate, addMeal, removeMeal, updateWater, updateSleep } = useData();

    if (!profile) return <Navigate to="/profile" replace />;

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
        <div className="p-5 space-y-6 animate-fade-in pb-32 max-w-7xl mx-auto lg:px-10">
            {/* Header */}
            <header className="flex justify-between items-center lg:mb-4">
                <h1 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
                    Daily Tracker
                </h1>

                <div className="flex items-center gap-1 bg-surfaceHighlight/50 p-1 rounded-xl backdrop-blur-md relative">
                    <button onClick={() => shiftDate(-1)} className="p-2 hover:bg-white/10 rounded-lg text-primary transition-colors"><ChevronLeft size={16} /></button>
                    <button onClick={() => setShowCalendar(!showCalendar)} className="text-sm lg:text-base font-medium px-2 py-1 min-w-[100px] text-center">
                        {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </button>
                    <button onClick={() => shiftDate(1)} className="p-2 hover:bg-white/10 rounded-lg text-primary transition-colors"><ChevronRight size={16} /></button>

                    {/* Popover Calendar */}
                    {showCalendar && (
                        <div className="absolute top-14 right-0 z-50 glass-card p-4 rounded-2xl animate-fade-in shadow-2xl">
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
            <div className="flex p-1 bg-surfaceHighlight/30 rounded-2xl backdrop-blur-md relative overflow-hidden max-w-md mx-auto lg:max-w-xl">
                {[
                    { id: 'food', icon: Utensils, label: 'Food' },
                    { id: 'water', icon: GlassWater, label: 'Water' },
                    { id: 'sleep', icon: Moon, label: 'Sleep' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex-1 flex flex-col lg:flex-row items-center justify-center py-3 lg:py-4 lg:gap-3 text-xs lg:text-sm font-bold rounded-xl transition-all relative z-10",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-lg shadow-primary/25 translate-y-[-2px]"
                                : "text-text-muted hover:text-white"
                        )}
                    >
                        <tab.icon className={cn("w-5 h-5 lg:w-6 lg:h-6 mb-1 lg:mb-0", activeTab === tab.id ? "text-white" : "text-text-muted")} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="animate-slide-up">
                {activeTab === 'food' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Column: Summary & Form */}
                        <div className="space-y-6">
                            {/* Summary Card */}
                            <div className="glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                                    <Utensils size={140} />
                                </div>

                                <div className="relative z-10 text-center space-y-4">
                                    <p className="text-sm lg:text-base text-text-muted font-bold uppercase tracking-wider">Calories Consumed</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-red-500">
                                            {totalCalories}
                                        </span>
                                        <span className="text-sm lg:text-lg text-text-muted mt-4 lg:mt-8">/ {calorieGoal} kcal</span>
                                    </div>

                                    <div className="w-full h-3 lg:h-4 bg-surfaceHighlight rounded-full mt-4 overflow-hidden relative">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Add Meal Form */}
                            <div className="glass p-6 rounded-3xl space-y-4">
                                <h3 className="font-bold text-base text-white flex items-center gap-2"><Plus size={20} className="text-primary" /> Add Meal</h3>
                                <form onSubmit={handleAddMeal} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            className="md:col-span-2 w-full bg-surfaceHighlight/50 border border-white/5 rounded-xl px-4 py-3 text-sm lg:text-base focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted/50 transition-all"
                                            placeholder="Meal Name (e.g., Chicken Rice)"
                                            value={newMeal.name}
                                            onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                                        />
                                        <input
                                            className="w-full bg-surfaceHighlight/50 border border-white/5 rounded-xl px-4 py-3 text-sm lg:text-base focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted/50"
                                            placeholder="Calories"
                                            type="number"
                                            value={newMeal.calories}
                                            onChange={e => setNewMeal({ ...newMeal, calories: e.target.value })}
                                        />
                                        <input
                                            className="w-full bg-surfaceHighlight/50 border border-white/5 rounded-xl px-4 py-3 text-sm lg:text-base focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted/50"
                                            placeholder="Protein (g)"
                                            type="number"
                                            value={newMeal.protein}
                                            onChange={e => setNewMeal({ ...newMeal, protein: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-primary text-white rounded-xl py-3 lg:py-4 font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                                        <Plus size={20} /> Add Log Entry
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Recent Meals */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-sm lg:text-base text-text-muted uppercase tracking-wider px-2">Today's Logs</h3>
                            {currentData.meals.length > 0 ? (
                                <div className="space-y-3">
                                    {currentData.meals.map((meal) => (
                                        <div key={meal.id} className="flex items-center justify-between p-4 lg:p-5 rounded-2xl bg-surface border border-white/5 hover:border-primary/20 transition-all group">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 mt-0.5">
                                                    <Utensils size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white lg:text-lg">{meal.name}</p>
                                                    <p className="text-xs lg:text-sm text-text-muted">{meal.time} • <span className="text-yellow-500">{meal.protein || 0}g Protein</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-orange-400 lg:text-xl">{meal.calories}</span>
                                                <button onClick={() => removeMeal(selectedDate, meal.id)} className="text-text-muted hover:text-red-500 p-2 rounded-full hover:bg-white/5 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-text-muted text-sm lg:text-base border border-dashed border-white/10 rounded-3xl">
                                    No meals logged for this day
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'water' && (
                    <div className="max-w-3xl mx-auto space-y-10 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div className="flex justify-center" onClick={() => updateWater(selectedDate, 1)}>
                                <WaterWave percentage={(currentWaterMl / waterGoal) * 100} />
                            </div>

                            <div className="space-y-8">
                                <div className="text-center md:text-left space-y-2">
                                    <h2 className="text-6xl lg:text-7xl font-bold text-white">{currentWaterMl} <span className="text-2xl text-text-muted font-medium ml-1">ml</span></h2>
                                    <p className="text-text-muted text-lg">Daily Goal: {waterGoal} ml</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => updateWater(selectedDate, -1)} disabled={currentWaterMl <= 0} className="py-5 rounded-2xl bg-surfaceHighlight border border-white/5 text-text-muted font-bold hover:bg-surfaceHighlight/80 active:scale-95 transition-all lg:text-lg">
                                        - 250ml
                                    </button>
                                    <button onClick={() => updateWater(selectedDate, 1)} className="py-5 rounded-2xl bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all lg:text-lg">
                                        + 250ml
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sleep' && (
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="p-10 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-[32px] border border-indigo-500/30 text-center space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
                            <Moon className="w-20 h-20 text-indigo-400 mx-auto drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]" />
                            <div>
                                <p className="text-7xl font-bold text-white">{currentData.sleepDuration}<span className="text-2xl text-text-muted font-medium ml-1">h</span></p>
                                <p className="text-indigo-300 text-base mt-2 font-medium">Total Sleep Time</p>
                            </div>
                            <div className="flex justify-center gap-12 text-base pt-6 border-t border-white/5">
                                <div>
                                    <p className="text-text-muted mb-1">Bedtime</p>
                                    <p className="font-bold text-xl text-white">{currentData.sleepStart || '--:--'}</p>
                                </div>
                                <div>
                                    <p className="text-text-muted mb-1">Wake Up</p>
                                    <p className="font-bold text-xl text-white">{currentData.sleepEnd || '--:--'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[32px] space-y-8">
                            <h3 className="text-xl font-bold text-white">Log Sleep Hours</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Bedtime</label>
                                    <input
                                        type="time"
                                        className="w-full bg-surfaceHighlight border border-white/10 rounded-2xl px-5 py-4 text-white lg:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        value={sleepTimes.start}
                                        onChange={(e) => setSleepTimes(prev => ({ ...prev, start: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Wake Up</label>
                                    <input
                                        type="time"
                                        className="w-full bg-surfaceHighlight border border-white/10 rounded-2xl px-5 py-4 text-white lg:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        value={sleepTimes.end}
                                        onChange={(e) => setSleepTimes(prev => ({ ...prev, end: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] lg:text-lg"
                                onClick={handleSleepUpdate}
                            >
                                Update Sleep Records
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
