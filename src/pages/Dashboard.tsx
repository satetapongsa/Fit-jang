import { MBTI_TIPS } from '../utils/mbtiData';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData';
import {
    Activity, Moon, Droplets,
    Dumbbell, Calendar as CalendarIcon, Flame, Utensils
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
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


    if (!profile) return <Navigate to="/profile" replace />;

    return (
        <div className="pb-32 space-y-8 animate-fade-in relative max-w-7xl mx-auto">

            {/* Header / Week Strip */}
            <header className="px-5 pt-4">
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Fitness Evolution</p>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-none">
                            Hello, <span className="text-primary">{profile.name.split(' ')[0]}</span>
                        </h1>
                        <div className="flex gap-2 mt-2">
                            {profile.mbti && (
                                <span className="px-2 py-0.5 rounded-md bg-secondary/20 border border-secondary/30 text-secondary text-[10px] font-bold tracking-wider uppercase">
                                    {profile.mbti} Type
                                </span>
                            )}
                            <span className="px-2 py-0.5 rounded-md bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold tracking-wider uppercase">
                                {profile.goal.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                    <Link to="/profile" className="relative group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-surfaceHighlight to-surface border border-white/10 flex items-center justify-center text-xl font-bold shadow-lg group-hover:border-primary/50 transition-all duration-300">
                            {profile.name[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full shadow-lg"></div>
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
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 glass-card rounded-3xl p-6 lg:p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-50 transition-opacity">
                            <Flame className="text-orange-500 w-48 h-48 lg:w-64 lg:h-64 absolute -top-16 -right-16 blur-2xl" />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
                            <div className="text-center md:text-left">
                                <p className="text-text-muted text-sm lg:text-base font-medium mb-1">Calories Remaining</p>
                                <h2 className="text-4xl lg:text-6xl font-bold text-white">{Math.max(0, calorieTarget - totalCalories)}</h2>
                                <p className="text-xs lg:text-sm text-text-muted mt-2">Target: {calorieTarget} kcal</p>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <DonutChart
                                    value={totalCalories}
                                    max={calorieTarget}
                                    size={120}
                                    strokeWidth={10}
                                    color="#f97316"
                                    label={`${Math.round((totalCalories / calorieTarget) * 100)}%`}
                                />
                                <p className="mt-2 text-xs font-bold text-orange-500 md:hidden">Consumed</p>
                            </div>
                        </div>
                    </div>

                    {/* MBTI Insight Card */}
                    {profile.mbti && MBTI_TIPS[profile.mbti] && (
                        <div className="glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center border-l-4" style={{ borderColor: MBTI_TIPS[profile.mbti].color }}>
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Activity size={120} />
                            </div>
                            <div className="relative z-10 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: MBTI_TIPS[profile.mbti].color }}></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Personality Insight</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white">{MBTI_TIPS[profile.mbti].trait}</h3>
                                <p className="text-sm text-text-muted leading-relaxed italic">
                                    "{MBTI_TIPS[profile.mbti].tip}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Macronutrients Grid */}
            <section className="px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                <div className="col-span-2 md:col-span-1">
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
