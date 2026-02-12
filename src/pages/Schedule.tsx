import { useState } from 'react';
import Calendar from 'react-calendar';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData';
import 'react-calendar/dist/Calendar.css';
import '../calendar-custom.css';
import { Dumbbell, X, ChevronLeft, ChevronRight, Coffee } from 'lucide-react';
import { cn } from '../utils/cn';

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div
                className="bg-surface border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surfaceHighlight/30 backdrop-blur-xl absolute top-0 left-0 right-0 z-10 glass">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="pt-16 pb-safe overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Schedule() {
    const { profile, calculateBMI } = useUser();
    const { selectedDate, setSelectedDate, getDataForDate } = useData();

    const [viewDate, setViewDate] = useState<Value>(selectedDate);
    const [selectedExercise, setSelectedExercise] = useState<any>(null);

    const bmi = calculateBMI();
    const plan = profile ? generateSmartPlan(profile.workoutDays, bmi.category, profile.goal) : null;

    const handleDateChange = (newDate: Value) => {
        setViewDate(newDate);
        if (newDate instanceof Date) {
            setSelectedDate(newDate);
        }
    };

    const getTileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const hasData = getDataForDate(date).workoutCompleted;
            if (hasData) return <div className="h-1.5 w-1.5 bg-green-500 rounded-full mx-auto mt-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>;

            if (plan) {
                const workout = getDailyWorkout(plan, date);
                if (workout) return <div className="h-1.5 w-1.5 bg-primary/40 rounded-full mx-auto mt-1"></div>;
            }
        }
        return null;
    };

    const displayDate = viewDate instanceof Date ? viewDate : new Date();
    const selectedWorkout = plan ? getDailyWorkout(plan, displayDate) : null;
    const dayData = getDataForDate(displayDate);

    return (
        <div className="p-5 space-y-6 animate-fade-in pb-32">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
                    Workout Schedule
                </h1>
                {/* Export Button (Hidden on strict mobile view to save space, or use icon only) */}
                {/* <button className="p-2 rounded-full bg-surfaceHighlight text-primary"><CalendarDays size={20}/></button> */}
            </header>

            {/* Calendar Card */}
            <div className="glass-card rounded-3xl p-4 transition-all hover:border-primary/20">
                <Calendar
                    onChange={handleDateChange}
                    value={viewDate}
                    tileContent={getTileContent}
                    className="react-calendar-dark border-none bg-transparent w-full font-sans text-sm"
                    prevLabel={<ChevronLeft className="w-5 h-5 text-primary" />}
                    nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
                />
            </div>

            {/* Selected Date Details */}
            <div className="space-y-4">
                <div className="flex items-baseline justify-between px-2">
                    <h2 className="text-lg font-bold text-white">
                        {displayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </h2>
                    {selectedWorkout && (
                        <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            {selectedWorkout.type.split('(')[0]}
                        </span>
                    )}
                </div>

                {selectedWorkout ? (
                    <div className="space-y-4">
                        {/* Summary Card */}
                        <div className="p-5 rounded-3xl bg-gradient-to-br from-surfaceHighlight to-surface border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Dumbbell size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn("p-2 rounded-xl", dayData.workoutCompleted ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary")}>
                                        <Dumbbell size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base text-white">{selectedWorkout.type}</h3>
                                        <p className={cn("text-xs font-medium", dayData.workoutCompleted ? "text-green-500" : "text-text-muted")}>
                                            {dayData.workoutCompleted ? 'Completed ✅' : 'Estimated: 45-60 min'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Exercise List */}
                        <div className="space-y-3">
                            {selectedWorkout.exercises.map((ex, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedExercise(ex)}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all cursor-pointer group active:scale-[0.98]"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-surfaceHighlight overflow-hidden shrink-0 relative group-hover:shadow-lg transition-shadow">
                                        {ex.image ? (
                                            <img src={ex.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-text-muted"><Dumbbell size={20} /></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm text-white group-hover:text-primary transition-colors truncate">{ex.name}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-text-muted font-medium bg-white/5 px-2 py-0.5 rounded-md">{ex.sets} Sets</span>
                                            <span className="text-xs text-text-muted font-medium bg-white/5 px-2 py-0.5 rounded-md">{ex.reps} Reps</span>
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="py-12 px-6 text-center rounded-3xl border border-dashed border-white/10 bg-white/5">
                        <Coffee size={40} className="mx-auto text-orange-400 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Rest Day</h3>
                        <p className="text-sm text-text-muted">No workout scheduled. Take a break!</p>
                    </div>
                )}
            </div>

            {/* Exercise Detail Modal */}
            <Modal
                isOpen={!!selectedExercise}
                onClose={() => setSelectedExercise(null)}
                title={selectedExercise?.name || ''}
            >
                {selectedExercise && (
                    <div className="space-y-6 pb-6">
                        {/* Hero Image */}
                        <div className="w-full aspect-video bg-black relative">
                            {selectedExercise.image ? (
                                <img src={selectedExercise.image} alt={selectedExercise.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-text-muted"><Dumbbell size={48} opacity={0.5} /></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                        </div>

                        <div className="px-6 space-y-6 -mt-12 relative z-10">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="glass p-3 rounded-2xl text-center backdrop-blur-md border border-white/10">
                                    <p className="text-2xl font-bold text-white">{selectedExercise.sets}</p>
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Sets</p>
                                </div>
                                <div className="glass p-3 rounded-2xl text-center backdrop-blur-md border border-white/10">
                                    <p className="text-2xl font-bold text-primary">{selectedExercise.reps}</p>
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Reps</p>
                                </div>
                                <div className="glass p-3 rounded-2xl text-center backdrop-blur-md border border-white/10">
                                    <p className="text-2xl font-bold text-blue-400">60s</p>
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Rest</p>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-lg text-white flex items-center gap-2">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    How to Perform
                                </h4>
                                <p className="text-text-muted leading-relaxed text-sm">
                                    {selectedExercise.description || "Focus on form and controlled movement."}
                                </p>
                            </div>

                            <div className="pt-4">
                                <button
                                    className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                                    onClick={() => setSelectedExercise(null)}
                                >
                                    Got It
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
