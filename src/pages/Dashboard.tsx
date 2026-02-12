import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { Card } from '../components/ui/Card';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData';
import { CheckCircle2, Flame, Droplets, Moon, Coffee, CalendarDays, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';



export default function Dashboard() {
    const { profile, calculateBMR, calculateBMI } = useUser();
    const { getDataForDate, toggleWorkoutComplete } = useData();

    const today = new Date();
    const todayData = getDataForDate(today);

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4 text-center">
                <h2 className="text-2xl font-bold">No Profile Found</h2>
                <p className="text-text-muted">โปรดสร้างโปรไฟล์เพื่อเริ่มต้น</p>
                <Link to="/profile" className="w-full max-w-xs">
                    <button className="w-full bg-primary text-primary-foreground h-11 rounded-lg font-medium">
                        Create Profile
                    </button>
                </Link>
            </div>
        );
    }

    const bmr = calculateBMR();
    const bmi = calculateBMI();
    const plan = generateSmartPlan(
        profile.workoutDays,
        bmi.category,
        (profile.goal as 'general' | 'lose_weight' | 'build_muscle' | 'tone_legs' | 'lose_belly') || 'general'
    );
    const dailyWorkout = getDailyWorkout(plan, today);

    const totalCalories = todayData.meals.reduce((acc, curr) => acc + curr.calories, 0);

    const DAYS_TH_SHORT = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in pb-24">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl uppercase border border-primary/50">
                        {profile.name[0] || 'U'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">สวัสดี, {profile.name.split(' ')[0]}</h1>
                        <p className="text-text-muted">มาสร้างหุ่นในฝันของคุณกันเถอะ</p>
                    </div>
                </div>
                <div className="text-left md:text-right bg-surfaceHighlight p-3 rounded-lg flex items-center gap-6">
                    <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">โปรแกรมปัจจุบัน</p>
                        <p className="font-semibold text-primary">{plan.name}</p>
                    </div>
                    <div className="h-8 w-[1px] bg-border"></div>
                    <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">เป้าหมาย</p>
                        <p className="font-semibold text-primary capitalize">
                            {profile.goal?.replace('_', ' ') || 'General'}
                        </p>
                    </div>
                </div>
            </header>

            {/* Weekly Schedule Preview Table */}
            <section className="bg-surface/50 border border-border rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-primary" /> ตารางออกกำลังกายสัปดาห์นี้
                    </h3>
                    <Link to="/schedule" className="text-sm text-primary hover:underline">ดูเต็มๆ &gt;</Link>
                </div>
                <div className="grid grid-cols-7 gap-2 min-w-[600px]">
                    {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
                        const dayWorkout = plan.schedule.find(s => s.day === dayIndex);
                        const isToday = today.getDay() === dayIndex;
                        return (
                            <div key={dayIndex} className={`flex flex-col p-2 rounded-lg border ${isToday ? 'border-primary bg-primary/5' : 'border-border bg-surface'}`}>
                                <span className={`text-xs font-bold text-center mb-2 ${isToday ? 'text-primary' : 'text-text-muted'}`}>
                                    {DAYS_TH_SHORT[dayIndex]}
                                </span>
                                {dayWorkout ? (
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-[10px] text-center leading-tight line-clamp-2">
                                            {dayWorkout.type.split('(')[0]}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-1 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-border"></div>
                                        <span className="text-[10px] text-text-muted text-center">Rest</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Workout Card */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Dumbbell className="w-6 h-6 text-primary" />
                        กิจกรรมวันนี้
                    </h2>

                    {dailyWorkout ? (
                        <Card className="border-primary/20 bg-surface/50 overflow-hidden relative">
                            {todayData.workoutCompleted && (
                                <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20 animate-fade-in backdrop-blur-sm">
                                    <div className="bg-surface p-8 rounded-2xl border border-primary text-center shadow-xl">
                                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
                                        <h3 className="text-2xl font-bold text-green-500">เยี่ยมมาก!</h3>
                                        <p className="text-text-muted mb-4">ออกกำลังกายวันนี้เสร็จสิ้นแล้ว</p>
                                        <button
                                            onClick={() => toggleWorkoutComplete(today)}
                                            className="text-sm underline text-text-muted hover:text-white"
                                        >
                                            ยกเลิก (Undo)
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="relative z-10 p-6">
                                <div className="flex justify-between items-start mb-6 border-b border-border/50 pb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                                            TODAY'S SESSION
                                        </span>
                                        <h3 className="text-3xl font-bold text-white mb-2">{dailyWorkout.type}</h3>
                                        <p className="text-text-muted text-sm">
                                            เน้น: {dailyWorkout.type.includes('Legs') ? 'ช่วงล่าง' : dailyWorkout.type.includes('Push') ? 'อก ไหล่ หลังแขน' : 'ตามตาราง'}
                                        </p>
                                    </div>
                                    {!todayData.workoutCompleted && (
                                        <button
                                            onClick={() => toggleWorkoutComplete(today)}
                                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20"
                                        >
                                            <CheckCircle2 size={24} />
                                            <span>เสร็จสิ้น (Finish)</span>
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {dailyWorkout.exercises.map((ex, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-surfaceHighlight flex items-center justify-center font-bold text-text-muted group-hover:bg-primary group-hover:text-white transition-colors">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-lg text-white group-hover:text-primary transition-colors">
                                                        {ex.name}
                                                    </span>
                                                    <span className="text-sm text-text-muted">{ex.sets} เซต (Sets)</span>
                                                </div>
                                            </div>
                                            <span className="font-mono text-lg font-bold bg-surfaceHighlight px-4 py-2 rounded-lg border border-border">
                                                {ex.reps} <span className="text-xs font-normal text-text-muted">ครั้ง/วิ</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="flex flex-col items-center justify-center p-12 text-center border-border/50 bg-surface/30 h-80">
                            <div className="p-6 bg-surfaceHighlight rounded-full mb-6 text-text-muted">
                                <Coffee size={48} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">วันพักผ่อน (Rest Day)</h3>
                            <p className="text-text-muted max-w-md mx-auto text-lg">
                                การพักผ่อนคือส่วนสำคัญของการสร้างกล้ามเนื้อ ดื่มน้ำเยอะๆ และนอนหลับให้เพียงพอ
                            </p>
                        </Card>
                    )}
                </div>

                {/* Side Stats */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">สรุปรายวัน</h2>
                    <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                                <Flame size={32} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-text-muted uppercase">แคลอรี่ที่ได้รับ</p>
                                <p className="text-3xl font-bold">{totalCalories}</p>
                                <p className="text-sm text-text-muted">เป้าหมาย: {Math.round(bmr * 1.2)} kcal</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                <Droplets size={32} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-text-muted uppercase">น้ำดื่ม</p>
                                <p className="text-3xl font-bold">{Math.round(todayData.waterIntake * 250)} ml</p>
                                <p className="text-sm text-text-muted">เป้าหมาย: {profile.waterGoal} ml</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 p-5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-500">
                                <Moon size={32} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-text-muted uppercase">การนอนหลับ</p>
                                <p className="text-3xl font-bold">{todayData.sleepDuration} <span className="text-lg">ชม.</span></p>
                            </div>
                        </div>
                    </Card>

                    <Link to="/tracker">
                        <button className="w-full mt-4 py-3 rounded-xl border border-border hover:bg-surfaceHighlight transition-colors text-sm font-semibold">
                            บันทึกข้อมูลเพิ่มเติม &gt;
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
