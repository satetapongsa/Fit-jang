import { cn } from '../utils/cn';
import { Check, Clock, Trash2 } from 'lucide-react';

export interface TimelineItem {
    id: string;
    time: string;
    title: string;
    type: 'meal' | 'workout' | 'sleep' | 'water' | 'other';
    isCompleted: boolean;
}

interface DailyTimelineProps {
    items: TimelineItem[];
    onToggle?: (id: string) => void;
    onDelete?: (id: string, type: string) => void;
}

export default function DailyTimeline({ items, onToggle, onDelete }: DailyTimelineProps) {
    if (items.length === 0) {
        return <div className="text-center text-text-muted py-8">No activities scheduled for today.</div>;
    }

    return (
        <div className="flex flex-col space-y-6 relative ml-4 pl-6 border-l border-white/10">
            {items.map((item) => (
                <div key={item.id} className="relative group flex justify-between items-start">
                    <div className="relative flex-1">
                        {/* Timeline Dot */}
                        <div
                            className={cn(
                                "absolute -left-[30px] top-1 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10",
                                item.isCompleted
                                    ? "bg-primary border-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                                    : "bg-background border-border group-hover:border-primary/50"
                            )}
                        >
                            {item.isCompleted && <Check size={10} className="text-background absolute inset-0 m-auto font-bold" />}
                        </div>

                        <div
                            className={cn(
                                "flex flex-col transition-opacity duration-300 cursor-pointer",
                                item.isCompleted ? "opacity-50" : "opacity-100"
                            )}
                            onClick={() => onToggle?.(item.id)}
                        >
                            <div className="flex items-center space-x-2 text-xs text-primary mb-1">
                                <Clock size={12} />
                                <span>{item.time}</span>
                            </div>
                            <h4 className="text-base font-medium">{item.title}</h4>
                            <span className="text-xs text-text-muted capitalize">{item.type}</span>
                        </div>
                    </div>
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id, item.type);
                            }}
                            className="text-text-muted hover:text-red-500 transition-colors p-2 cursor-pointer z-50 rounded-full hover:bg-white/10"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
