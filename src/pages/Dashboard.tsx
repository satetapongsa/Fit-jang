import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData';
import {
    Activity, Moon, Droplets,
    Dumbbell, Calendar as CalendarIcon, Flame, Utensils
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import DonutChart from '../components/charts/DonutChart';
import DailyTimeline, { type TimelineItem } from '../components/DailyTimeline';
import MacronutrientCard from '../components/MacronutrientCard';

export default function Dashboard() {
    const { profile, calculateBMR, calculateBMI } = useUser();
    const { getDataForDate, updateWater, removeMeal, clearSleep } = useData();

    const today = new Date();
    const todayData = getDataForDate(today);

    // -- Calculations --
    const bmr = calculateBMR();
    const tdee = Math.round(bmr * (
        profile?.activityLevel === 'sedentary' ? 1.2 :
            profile?.activityLevel === 'light' ? 1.375 :
                profile?.activityLevel === 'moderate' ? 1.55 :
                    profile?.activityLevel === 'active' ? 1.725 : 1.9
    ));

    let calorieTarget = tdee;
    if (profile?.goal === 'lose_weight' || profile?.goal === 'lose_belly') calorieTarget -= 500;
    else if (profile?.goal === 'build_muscle') calorieTarget += 300;
    if (profile?.calorieGoal) calorieTarget = profile.calorieGoal;

    const bmi = calculateBMI();
    const plan = generateSmartPlan(profile?.workoutDays || 3, bmi.category, profile?.goal || 'general');
    const dailyWorkout = getDailyWorkout(plan, today);
    const DAYS_TH_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Nutrition Totals
    const totalCalories = todayData.meals.reduce((acc, curr) => acc + curr.calories, 0);
    const totalProtein = todayData.meals.reduce((acc, curr) => acc + (curr.protein || 0), 0);
    const totalFat = todayData.meals.reduce((acc, curr) => acc + (curr.fat || 0), 0);
    const totalSugar = todayData.meals.reduce((acc, curr) => acc + (curr.sugar || 0), 0);

    // Timeline Data Preparation
    const timelineItems: TimelineItem[] = [];
    if (todayData.sleepStart && todayData.sleepEnd) {
        timelineItems.push({ id: 'sleep-wake', time: todayData.sleepEnd, title: 'Wake Up', type: 'sleep', isCompleted: true });
    }
    todayData.meals.forEach(meal => {
        timelineItems.push({ id: meal.id, time: meal.time, title: meal.name, type: 'meal', isCompleted: true });
    });
    if (dailyWorkout) {
        timelineItems.push({ id: 'workout-today', time: '17:00', title: dailyWorkout.type, type: 'workout', isCompleted: todayData.workoutCompleted });
    }
    // Sort logic would go here if times were comparable objects, simple sort for now
    timelineItems.sort((a, b) => a.time.localeCompare(b.time));


    if (!profile) return <div className="p-10 text-center">Loading Profile...</div>;

    return (
        <div className="pb-32 space-y-8 animate-fade-in relative">

            {/* Header / Week Strip */}
            <header className="px-5 pt-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Overview</p>
                        <h1 className="text-3xl font-bold text-white">
                            Hello, <span className="text-primary">{profile.name.split(' ')[0]}</span>
                        </h1>
                    </div>
                    <Link to="/profile" className="relative group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-surfaceHighlight to-surface border border-white/10 flex items-center justify-center text-lg font-bold shadow-lg group-hover:border-primary/50 transition-colors">
                            {profile.name[0]}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    </Link>
                </div>

                {/* Date Strip */}
                <div className="flex justify-between items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {[-1, 0, 1, 2, 3].map((offset) => {
                        const d = new Date();
                        d.setDate(today.getDate() + offset);
                        const isSelected = offset === 0;

                        return (
                            <div key={offset} className={cn(
                                "flex flex-col items-center justify-center min-w-[3.5rem] h-20 rounded-2xl border transition-all duration-300",
                                isSelected
                                    ? "bg-primary border-primary shadow-[0_4px_20px_rgba(14,165,233,0.4)] scale-105"
                                    : "bg-surface/50 border-white/5 text-text-muted opacity-50"
                            )}>
                                <span className="text-xs font-medium mb-1">{DAYS_TH_SHORT[d.getDay()]}</span>
                                <span className="text-lg font-bold">{d.getDate()}</span>
                            </div>
                        )
                    })}
                </div>
            </header>

            {/* Main Stats (Calories) */}
            <section className="px-5">
                <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-30">
                        <Flame className="text-orange-500 w-32 h-32 absolute -top-10 -right-10 blur-xl" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-text-muted text-sm font-medium mb-1">Calories Remaining</p>
                            <h2 className="text-4xl font-bold text-white">{Math.max(0, calorieTarget - totalCalories)}</h2>
                            <p className="text-xs text-text-muted mt-2">Target: {calorieTarget} kcal</p>
                        </div>
                        <div className="relative">
                            <DonutChart
                                value={totalCalories}
                                max={calorieTarget}
                                size={100}
                                strokeWidth={8}
                                color="#f97316"
                                label={`${Math.round((totalCalories / calorieTarget) * 100)}%`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Macronutrients Grid */}
            <section className="px-5 grid grid-cols-2 gap-4">
                <MacronutrientCard
                    title="Protein"
                    value={totalProtein}
                    max={profile.weight ? profile.weight * 2 : 150} // Rough estimate 2g per kg
                    unit="g"
                    color="#facc15" // Yellow
                    icon={<Dumbbell size={16} />}
                />
                <MacronutrientCard
                    title="Fat"
                    value={totalFat}
                    max={70} // Estimate
                    unit="g"
                    color="#f43f5e" // Rose
                    icon={<Activity size={16} />}
                />
                <MacronutrientCard
                    title="Sugar"
                    value={totalSugar}
                    max={30} // 30g daily limit recommendation
                    unit="g"
                    color="#e879f9" // Pink
                    icon={<Utensils size={16} />}
                />
                <MacronutrientCard
                    title="Water"
                    value={todayData.waterIntake * 0.25} // Liters
                    max={profile.waterGoal ? profile.waterGoal / 1000 : 2.5}
                    unit="L"
                    color="#3b82f6" // Blue
                    icon={<Droplets size={16} />}
                    onAdd={() => updateWater(today, 1)}
                />
                <div className="col-span-2">
                    <MacronutrientCard
                        title="Sleep"
                        value={todayData.sleepDuration}
                        max={8}
                        unit="h"
                        color="#818cf8" // Indigo
                        icon={<Moon size={16} />}
                    />
                </div>
            </section>

            {/* Timeline View */}
            <section className="px-5 relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <CalendarIcon className="text-primary" size={20} />
                        Your Timeline
                    </h3>
                    <Link to="/schedule" className="text-xs text-primary">View Full</Link>
                </div>

                <DailyTimeline
                    items={timelineItems}
                    onDelete={(id, type) => {
                        if (type === 'meal') {
                            removeMeal(today, id);
                        } else if (type === 'sleep') {
                            clearSleep(today);
                        }
                    }}
                />
            </section>
        </div>
    );
}
