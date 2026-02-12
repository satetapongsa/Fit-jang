import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData';
import {
    CheckCircle2, Flame, Dumbbell, ChevronRight,
    Activity, TrendingUp, Footprints, MessageCircle, BarChart3, Scale,
    ArrowUp, Moon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import SimpleLineChart from '../components/charts/SimpleLineChart';

export default function Dashboard() {
    const { profile, calculateBMR, calculateBMI } = useUser();
    const { getDataForDate, toggleWorkoutComplete, setSelectedDate, updateBodyMetrics, updateSteps, updateSleep } = useData();
    const navigate = useNavigate();

    const [weightInput, setWeightInput] = useState('');
    const [bodyFatInput, setBodyFatInput] = useState('');
    const [stepsInput, setStepsInput] = useState('');
    const [sleepInput, setSleepInput] = useState('');
    const [showChat, setShowChat] = useState(false);

    const today = new Date();
    const todayData = getDataForDate(today);

    // Initial load of inputs from today's data
    useEffect(() => {
        if (todayData.weight) setWeightInput(todayData.weight.toString());
        if (todayData.bodyFat) setBodyFatInput(todayData.bodyFat.toString());
        if (todayData.steps) setStepsInput(todayData.steps.toString());
        if (todayData.sleepDuration) setSleepInput(todayData.sleepDuration.toString());
    }, []); // Run once on mount to prepopulate if data exists 

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6 text-center animate-fade-in">
                <div className="w-24 h-24 bg-surfaceHighlight rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/10">
                    <Dumbbell size={40} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Welcome to Fitjang</h2>
                <p className="text-text-muted max-w-xs mx-auto">เริ่มต้นการเปลี่ยนแปลงรูปร่างของคุณวันนี้ สร้างโปรไฟล์เพื่อรับตารางฝึกส่วนตัว</p>
                <Link to="/profile" className="w-full max-w-xs">
                    <button className="w-full bg-gradient-to-r from-primary to-emerald-600 text-white h-12 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform">
                        สร้างโปรไฟล์ (Create Profile)
                    </button>
                </Link>
            </div>
        );
    }

    // Calculations
    const bmr = calculateBMR();
    const tdee = Math.round(bmr * (
        profile.activityLevel === 'sedentary' ? 1.2 :
            profile.activityLevel === 'light' ? 1.375 :
                profile.activityLevel === 'moderate' ? 1.55 :
                    profile.activityLevel === 'active' ? 1.725 : 1.9
    ));

    // Calorie Target Recommendation
    let calorieTarget = tdee;
    if (profile.goal === 'lose_weight' || profile.goal === 'lose_belly') calorieTarget -= 500;
    else if (profile.goal === 'build_muscle') calorieTarget += 300;

    // Override if profile has custom goal
    if (profile.calorieGoal) calorieTarget = profile.calorieGoal;

    const bmi = calculateBMI();
    const plan = generateSmartPlan(profile.workoutDays, bmi.category, profile.goal || 'general');
    const dailyWorkout = getDailyWorkout(plan, today);
    const DAYS_TH_SHORT = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

    // Nutrition Totals
    const totalCalories = todayData.meals.reduce((acc, curr) => acc + curr.calories, 0);
    const totalProtein = todayData.meals.reduce((acc, curr) => acc + (curr.protein || 0), 0);

    // Goal Completion Calculation
    const calorieProgress = Math.min(totalCalories / calorieTarget, 1);
    const waterProgress = Math.min(todayData.waterIntake * 250 / (profile.waterGoal || 2000), 1);
    const workoutProgress = todayData.workoutCompleted ? 1 : 0;
    const sleepProgress = Math.min(todayData.sleepDuration / 8, 1);
    const goalCompletion = Math.round(((calorieProgress + waterProgress + workoutProgress + sleepProgress) / 4) * 100);

    // Handlers
    const handleWeightUpdate = () => {
        if (weightInput) updateBodyMetrics(today, parseFloat(weightInput), undefined);
    };
    const handleBodyFatUpdate = () => {
        if (bodyFatInput) updateBodyMetrics(today, undefined, parseFloat(bodyFatInput));
    };
    const handleStepsUpdate = () => {
        if (stepsInput) updateSteps(today, parseInt(stepsInput));
    };
    const handleSleepUpdate = () => {
        if (sleepInput) updateSleep(today, parseFloat(sleepInput));
    };

    // Mock Data for Trends (In a real app, calculate from history)
    const weightTrend = [70, 69.8, 69.5, 69.6, 69.2, 69.0, 68.8]; // Example
    const volTrend = [5000, 5200, 4800, 5500, 5800, 6000, 6200]; // Example

    return (
        <div className="p-5 space-y-8 animate-fade-in pb-32">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <p className="text-text-muted text-sm font-medium">ยินดีต้อนรับกลับ,</p>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
                        {profile.name.split(' ')[0]}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">LEVEL 5</span>
                    </div>
                    <Link to="/profile">
                        <div className="w-12 h-12 rounded-full bg-surfaceHighlight border border-white/10 flex items-center justify-center text-primary font-bold text-lg shadow-inner">
                            {profile.name[0]?.toUpperCase() || 'U'}
                        </div>
                    </Link>
                </div>
            </header>

            {/* Weekly Calendar */}
            <section className="space-y-3">
                <div className="flex justify-between items-end">
                    <h3 className="text-lg font-bold text-text">ตารางสัปดาห์นี้</h3>
                    <Link to="/schedule" className="text-xs text-primary font-medium flex items-center gap-1">
                        ดูทั้งหมด <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                        const isToday = today.getDay() === dayIndex;
                        const dayWorkout = plan.schedule.find(s => s.day === dayIndex);
                        const diff = today.getDay() - dayIndex;
                        const date = new Date(today);
                        date.setDate(today.getDate() - diff);

                        return (
                            <button
                                key={dayIndex}
                                onClick={() => { setSelectedDate(date); navigate('/schedule'); }}
                                className={cn(
                                    "flex flex-col items-center justify-center min-w-[3.5rem] h-20 rounded-2xl border snap-center transition-all",
                                    isToday ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105" : "bg-surface border-border text-text-muted hover:bg-surfaceHighlight"
                                )}
                            >
                                <span className="text-xs font-medium opacity-80">{DAYS_TH_SHORT[dayIndex]}</span>
                                {dayWorkout ? (
                                    <div className="mt-1 flex flex-col items-center">
                                        <span className="text-lg font-bold">{date.getDate()}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1"></span>
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold mt-1 opacity-50">{date.getDate()}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Goal Completion */}
            <section className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-20 pattern-dots" />
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold mb-1 opacity-90">Daily Goal Completion</h2>
                        <p className="text-sm opacity-70">ความสำเร็จวันนี้</p>
                    </div>
                    <div className="text-4xl font-bold">{goalCompletion}%</div>
                </div>
                <div className="w-full bg-black/20 h-2 rounded-full mt-4 overflow-hidden">
                    <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${goalCompletion}%` }} />
                </div>
            </section>

            {/* Metrics Grid (TDEE, BMI, Weight, etc) */}
            <section className="grid grid-cols-2 gap-4">
                {/* Calorie Target / TDEE */}
                <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-orange-500">
                        <Flame size={18} />
                        <span className="text-xs font-bold uppercase">Calorie Target</span>
                    </div>
                    <p className="text-2xl font-bold">{calorieTarget}</p>
                    <p className="text-xs text-text-muted mt-1">Rec: {tdee} (TDEE)</p>
                </div>

                {/* BMI */}
                <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-teal-500">
                        <Activity size={18} />
                        <span className="text-xs font-bold uppercase">BMI Score</span>
                    </div>
                    <p className="text-2xl font-bold">{bmi.value}</p>
                    <p className="text-xs text-text-muted mt-1">{bmi.category}</p>
                </div>

                {/* Weight Tracker */}
                <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm col-span-1">
                    <div className="flex items-center gap-2 mb-2 text-blue-500">
                        <Scale size={18} />
                        <span className="text-xs font-bold uppercase">Weight (kg)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="bg-background border border-border rounded w-20 px-2 py-1 text-lg font-bold"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value)}
                            onBlur={handleWeightUpdate}
                            placeholder="0.0"
                        />
                    </div>
                    <div className="h-8 mt-2">
                        <SimpleLineChart data={weightTrend} height={30} label="Trend" color="#3b82f6" />
                    </div>
                </div>

                {/* Steps Tracker */}
                <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm col-span-1">
                    <div className="flex items-center gap-2 mb-2 text-emerald-500">
                        <Footprints size={18} />
                        <span className="text-xs font-bold uppercase">Steps</span>
                    </div>
                    <input
                        type="number"
                        className="bg-background border border-border rounded w-full px-2 py-1 text-lg font-bold"
                        value={stepsInput}
                        onChange={(e) => setStepsInput(e.target.value)}
                        onBlur={handleStepsUpdate}
                        placeholder="0"
                    />
                    <p className="text-xs text-text-muted mt-1">Goal: 10,000</p>
                </div>

                {/* Body Fat & Sleep */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-purple-500">
                            <Activity size={18} />
                            <span className="text-xs font-bold uppercase">Body Fat %</span>
                        </div>
                        <input
                            type="number"
                            className="bg-background border border-border rounded w-full px-2 py-1 text-lg font-bold"
                            value={bodyFatInput}
                            onChange={(e) => setBodyFatInput(e.target.value)}
                            onBlur={handleBodyFatUpdate}
                            placeholder="%"
                        />
                    </div>
                    <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-indigo-500">
                            <Moon size={18} />
                            <span className="text-xs font-bold uppercase">Sleep (Hrs)</span>
                        </div>
                        <input
                            type="number"
                            className="bg-background border border-border rounded w-full px-2 py-1 text-lg font-bold"
                            value={sleepInput}
                            onChange={(e) => setSleepInput(e.target.value)}
                            onBlur={handleSleepUpdate}
                            placeholder="Hrs"
                        />
                    </div>
                </div>
            </section>

            {/* Daily Report - Bar Charts */}
            <section className="bg-surface rounded-3xl p-6 border border-border">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="text-primary" size={20} />
                    Daily Report (รายงานผลวันนี้)
                </h3>
                <div className="mt-4">
                    <SimpleBarChart
                        height={180}
                        data={[
                            { label: 'Prot (g)', value: totalProtein, color: '#facc15', max: 150 }, // Yellow for Protein
                            { label: 'Water (100ml)', value: Math.round(todayData.waterIntake * 2.5), color: '#3b82f6', max: 30 }, // Blue for Water
                            { label: 'Cal (x10)', value: Math.round(totalCalories / 10), color: '#f97316', max: 300 }, // Orange for Cals
                            { label: 'Sleep (Hr)', value: todayData.sleepDuration, color: '#818cf8', max: 12 }, // Indigo for Sleep
                        ]}
                    />
                </div>
            </section>

            {/* Trends Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} />
                    Trends (แนวโน้ม)
                </h3>

                <div className="bg-surface rounded-3xl p-5 border border-border">
                    <p className="text-xs font-bold text-text-muted mb-2 uppercase">Volume Trend (น้ำหนักที่ยกรวม)</p>
                    <SimpleLineChart data={volTrend} height={80} color="#10b981" label="Volume" />
                </div>

                <div className="bg-surface rounded-3xl p-5 border border-border">
                    <p className="text-xs font-bold text-text-muted mb-2 uppercase">Body Composition (รูปร่าง)</p>
                    <div className="h-20">
                        {/* Placeholder for complex body composition trend if we had more data */}
                        <SimpleLineChart data={weightTrend} height={80} color="#ec4899" label="Weight" />
                    </div>
                </div>
            </section>

            {/* Today's Workout (Compact) */}
            <section className="space-y-3">
                <h3 className="text-lg font-bold">Workout Today</h3>
                {dailyWorkout ? (
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <div>
                                <h4 className="font-bold text-lg">{dailyWorkout.type}</h4>
                                <p className="text-xs opacity-70">{dailyWorkout.exercises.length} Exercises</p>
                            </div>
                            <button onClick={() => toggleWorkoutComplete(today)} className={cn("p-2 rounded-full transition-colors", todayData.workoutCompleted ? "bg-green-500 text-white" : "bg-white/10 text-white")}>
                                <CheckCircle2 size={24} />
                            </button>
                        </div>

                        {/* Progress Bar of exercises */}
                        <div className="w-full bg-white/10 h-1.5 rounded-full mb-2">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${(todayData.completedExercises?.length || 0) / dailyWorkout.exercises.length * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-right opacity-60">
                            {todayData.completedExercises?.length || 0} / {dailyWorkout.exercises.length} Completed
                        </p>
                    </div>
                ) : (
                    <div className="p-4 bg-surface rounded-2xl text-center text-text-muted text-sm border border-border">Rest Day</div>
                )}
            </section>

            {/* Chat Floating Button */}
            <div className="fixed bottom-24 right-5 z-50">
                <button
                    onClick={() => setShowChat(!showChat)}
                    className="w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <MessageCircle size={28} />
                </button>
            </div>

            {/* Chat Overlay */}
            {showChat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-surface w-full max-w-sm rounded-3xl shadow-2xl h-[500px] flex flex-col overflow-hidden relative border border-border">
                        <div className="bg-primary p-4 text-white flex justify-between items-center">
                            <h3 className="font-bold">Fitjang Coach</h3>
                            <button onClick={() => setShowChat(false)} className="bg-white/20 p-1 rounded-full"><ChevronRight className="rotate-90" size={20} /></button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background/50">
                            <div className="bg-surfaceHighlight p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                                สวัสดีครับ! วันนี้มีอะไรให้ผมช่วยไหมครับ?
                            </div>
                            <div className="bg-primary/10 text-primary p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-sm">
                                ช่วยแนะนำท่าลดหน้าท้องหน่อยครับ
                            </div>
                            <div className="bg-surfaceHighlight p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                                ได้เลย! ลองทำท่า Plank 3 เซต เซตละ 45 วินาที แล้วต่อด้วย Russian Twist นะครับ
                            </div>
                        </div>
                        <div className="p-3 bg-surface border-t border-border flex gap-2">
                            <input className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Type a message..." />
                            <button className="bg-primary text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                                <ArrowUp size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
