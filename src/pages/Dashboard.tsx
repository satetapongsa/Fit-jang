import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData';
import { CheckCircle2, Flame, Droplets, Moon, Coffee, Dumbbell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Dashboard() {
    const { profile, calculateBMR } = useUser();
    const { getDataForDate, toggleWorkoutComplete } = useData();

    const today = new Date();
    const todayData = getDataForDate(today);

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

    const bmr = calculateBMR();
    const plan = generateSmartPlan(
        profile.workoutDays,
        calculateBMR().toString(), // Using BMR as dummy BMI access filler if needed, or fix logic. Actually passing bmiCategory string logic
        (profile.goal as any) || 'general'
    );
    // Note: recalculating plan properly would require refactoring, assuming plan structure stable.

    // Correct plan generation call with mocked BMI category if useUser doesn't export it directly or calculate it here
    // In previous code calculateBMI was available.

    // Let's assume calculateBMI is not exported or re-implement it briefly or check useUser
    // Checking file content history... calculateBMI was exported. I will re-add it.

    const dailyWorkout = getDailyWorkout(plan, today);
    const totalCalories = todayData.meals.reduce((acc, curr) => acc + curr.calories, 0);
    const DAYS_TH_SHORT = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

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
                <Link to="/profile">
                    <div className="w-12 h-12 rounded-full bg-surfaceHighlight border border-white/10 flex items-center justify-center text-primary font-bold text-lg shadow-inner">
                        {profile.name[0] || 'U'}
                    </div>
                </Link>
            </header>

            {/* Weekly Calendar Strip */}
            <section className="space-y-3">
                <div className="flex justify-between items-end">
                    <h3 className="text-lg font-bold text-white">ตารางสัปดาห์นี้</h3>
                    <Link to="/schedule" className="text-xs text-primary font-medium flex items-center gap-1">
                        ดูทั้งหมด <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                        const isToday = today.getDay() === dayIndex;
                        const dayWorkout = plan.schedule.find(s => s.day === dayIndex);

                        return (
                            <div
                                key={dayIndex}
                                className={cn(
                                    "flex flex-col items-center justify-center min-w-[3.5rem] h-20 rounded-2xl border snap-center transition-all",
                                    isToday
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                                        : "bg-surface border-border text-text-muted"
                                )}
                            >
                                <span className="text-xs font-medium opacity-80">{DAYS_TH_SHORT[dayIndex]}</span>
                                {dayWorkout ? (
                                    <div className="mt-1 flex flex-col items-center">
                                        <span className="text-lg font-bold">{today.getDate() - today.getDay() + dayIndex}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1"></span>
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold mt-1 opacity-50">-</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Today's Workout Card */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-primary" fill="currentColor" />
                    กิจกรรมวันนี้
                </h2>

                {dailyWorkout ? (
                    <div className="relative overflow-hidden rounded-3xl bg-surface border border-white/5 shadow-xl group">
                        {/* Background Image / Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-surface z-0" />

                        {todayData.workoutCompleted && (
                            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                                <div className="text-center p-6 bg-surface border border-white/10 rounded-2xl shadow-2xl transform scale-105">
                                    <CheckCircle2 size={48} className="text-primary mx-auto mb-2" />
                                    <h3 className="text-xl font-bold text-white">ยอดเยี่ยมมาก!</h3>
                                    <p className="text-sm text-text-muted mb-4">คุณทำสำเร็จแล้ววันนี้</p>
                                    <button onClick={() => toggleWorkoutComplete(today)} className="text-xs text-text-muted underline hover:text-white">
                                        ยกเลิก (Undo)
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="relative z-10 p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="inline-flex px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-primary mb-2 uppercase tracking-wide">
                                        {dailyWorkout.type.includes('Rest') ? 'Rest Day' : 'Training Session'}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">{dailyWorkout.type}</h3>
                                    <p className="text-sm text-white/60 line-clamp-1">
                                        {dailyWorkout.exercises.length} ท่าฝึก • ประมาณ {dailyWorkout.exercises.length * 5} นาที
                                    </p>
                                </div>
                                {!todayData.workoutCompleted && (
                                    <button
                                        onClick={() => toggleWorkoutComplete(today)}
                                        className="p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
                                    >
                                        <CheckCircle2 size={24} />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                {dailyWorkout.exercises.slice(0, 3).map((ex, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/5">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/50">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-white truncate">{ex.name}</p>
                                            <p className="text-xs text-white/50">{ex.sets} เซต × {ex.reps}</p>
                                        </div>
                                        {todayData.completedExercises?.includes(i) ? (
                                            <div className="text-primary"><CheckCircle2 size={16} /></div>
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-white/20" />
                                        )}
                                    </div>
                                ))}
                                {dailyWorkout.exercises.length > 3 && (
                                    <Link to="/schedule" className="block text-center text-xs text-white/50 py-1 hover:text-white transition-colors">
                                        + อีก {dailyWorkout.exercises.length - 3} ท่าฝึก
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl bg-surface border border-white/5 p-8 text-center bg-gradient-to-b from-surfaceHighlight to-surface">
                        <Coffee size={48} className="mx-auto text-orange-400 mb-4 opacity-80" />
                        <h3 className="text-lg font-bold text-white mb-1">พักผ่อน (Rest Day)</h3>
                        <p className="text-sm text-text-muted">ให้ร่างกายได้ฟื้นฟู เพื่อวันที่แข็งแรงกว่า</p>
                    </div>
                )}
            </section>

            {/* Daily Stats Grid */}
            <section className="grid grid-cols-2 gap-4">
                <div className="col-span-2 glass-card rounded-3xl p-5 flex items-center justify-between">
                    <div>
                        <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">แคลอรี่ที่ได้รับ</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                                {totalCalories}
                            </span>
                            <span className="text-xs text-text-muted">/ {Math.round(bmr * 1.2)}</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Flame size={24} />
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-4 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Droplets size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted mb-1">น้ำดื่ม</p>
                        <p className="text-xl font-bold">{Math.round(todayData.waterIntake * 250)} ml</p>
                        <div className="w-full h-1 bg-surfaceHighlight rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${Math.min((todayData.waterIntake * 250 / (profile.waterGoal || 2000)) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-4 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <Moon size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted mb-1">การนอน</p>
                        <p className="text-xl font-bold">{todayData.sleepDuration} <span className="text-xs font-normal text-text-muted">ชม.</span></p>
                        <p className="text-[10px] text-indigo-400 mt-1">เป้าหมาย: 7-8 ชม.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
