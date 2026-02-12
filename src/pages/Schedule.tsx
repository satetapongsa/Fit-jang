import { useState } from 'react';
import Calendar from 'react-calendar';
import { Card } from '../components/ui/Card';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';
import { generateSmartPlan, getDailyWorkout } from '../utils/workoutData'; // Updated
import 'react-calendar/dist/Calendar.css';
import '../calendar-custom.css';
import { Dumbbell, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Schedule() {
    const { profile, calculateBMI } = useUser();
    const { selectedDate, setSelectedDate, getDataForDate } = useData();
    const navigate = useNavigate();

    const [date, setDate] = useState<Value>(selectedDate);

    // Generate Smart Plan
    const bmi = calculateBMI();
    const plan = profile ? generateSmartPlan(profile.workoutDays, bmi.category, profile.goal) : null;

    const exportToCalendar = () => {
        if (!plan) return;

        let icsContent =
            `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Fitjang//Workout Plan//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

        // Generate events for the next 4 weeks
        const today = new Date();
        for (let i = 0; i < 28; i++) {
            const currentDay = new Date(today);
            currentDay.setDate(today.getDate() + i);

            const workout = getDailyWorkout(plan, currentDay);
            if (workout) {
                // Format date for ICS (YYYYMMDD)
                const dateStr = currentDay.toISOString().replace(/[-:]/g, '').split('T')[0];

                // Construct description
                const description = workout.exercises
                    .map(ex => `${ex.name}: ${ex.sets} sets x ${ex.reps}`)
                    .join('\\n');

                icsContent +=
                    `BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:Fitjang: ${workout.type}
DESCRIPTION:${description}
UID:${dateStr}-${workout.type.replace(/\s/g, '')}@fitjang.app
END:VEVENT
`;
            }
        }

        icsContent += "END:VCALENDAR";

        // Create blob and download
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'fitjang-schedule.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
        if (newDate instanceof Date) {
            setSelectedDate(newDate);
        }
    };

    const getTileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const hasData = getDataForDate(date).workoutCompleted;
            if (hasData) {
                return <div className="h-1.5 w-1.5 bg-green-500 rounded-full mx-auto mt-1"></div>;
            }

            if (plan) {
                const workout = getDailyWorkout(plan, date);
                if (workout) {
                    return <div className="h-1.5 w-1.5 bg-primary/50 rounded-full mx-auto mt-1"></div>;
                }
            }
        }
        return null;
    };

    const displayDate = date instanceof Date ? date : new Date();
    const selectedWorkout = plan ? getDailyWorkout(plan, displayDate) : null;
    const dayData = getDataForDate(displayDate);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in pb-24">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Workout Schedule</h1>
                <Button onClick={exportToCalendar} variant="outline" size="sm" className="gap-2">
                    <CalendarDays size={16} />
                    Sync to Calendar
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Card className="p-6 bg-surface/50 border-border/50 backdrop-blur-sm [&_.react-calendar]:w-full [&_.react-calendar]:bg-transparent [&_.react-calendar]:border-none [&_.react-calendar]:font-sans">
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            tileContent={getTileContent}
                            className="react-calendar-dark"
                        />
                    </Card>
                </div>

                <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-xl font-semibold">
                            {displayDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h2>
                        {selectedWorkout && (
                            <span className="text-primary text-sm font-medium px-3 py-1 bg-primary/10 rounded-full">
                                {selectedWorkout.type}
                            </span>
                        )}
                    </div>

                    {selectedWorkout ? (
                        <Card className={`border-primary/20 bg-surface/80 ${dayData.workoutCompleted ? 'border-green-500/50' : ''}`}>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${dayData.workoutCompleted ? 'bg-green-500/20 text-green-500' : 'bg-primary/10 text-primary'}`}>
                                            <Dumbbell size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{selectedWorkout.type} Session</h3>
                                            <p className="text-sm text-text-muted">
                                                {dayData.workoutCompleted ? 'Completed' : 'Estimated time: 45-60 min'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Exercise List</p>
                                    <ul className="space-y-3">
                                        {selectedWorkout.exercises.map((ex, index) => (
                                            <li key={index} className="flex items-center justify-between p-3 bg-surfaceHighlight rounded-lg hover:bg-surfaceHighlight/80 transition-colors cursor-default group">
                                                <span className="font-medium group-hover:text-primary transition-colors">{ex.name}</span>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="text-text-muted">{ex.sets} sets</span>
                                                    <span className="font-mono bg-background px-2 py-1 rounded text-xs border border-border">{ex.reps}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="flex flex-col items-center justify-center h-64 border-dashed border-2 border-border bg-transparent">
                            <p className="text-text-muted font-medium">No workout scheduled for this day.</p>
                            <p className="text-sm text-text-muted mt-1">Enjoy your recovery!</p>
                        </Card>
                    )}

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            setSelectedDate(displayDate);
                            navigate('/tracker');
                        }}
                    >
                        Go to Daily Tracker for this Data
                    </Button>
                </div>
            </div>
        </div>
    );
}
