import type { ReactNode } from 'react';
import DonutChart from './charts/DonutChart';
import { Plus } from 'lucide-react';

interface MacronutrientCardProps {
    title: string;
    value: number;
    max: number;
    unit: string;
    color: string;
    icon?: ReactNode;
    onAdd?: () => void;
}

export default function MacronutrientCard({
    title,
    value,
    max,
    unit,
    color,
    icon,
    onAdd
}: MacronutrientCardProps) {
    return (
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-between relative overflow-hidden group">
            {/* Background glow effect */}
            <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"
                style={{ backgroundColor: color }}
            />

            <div className="flex w-full justify-between items-start mb-2 z-10">
                <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-white/5 text-primary-foreground" style={{ color: color }}>
                        {icon}
                    </div>
                    <span className="font-semibold text-sm text-text-muted">{title}</span>
                </div>
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Plus size={16} className="text-text-muted hover:text-white" />
                    </button>
                )}
            </div>

            <div className="relative z-10">
                <DonutChart
                    value={value}
                    max={max}
                    size={80}
                    strokeWidth={8}
                    color={color}
                    label={value.toString()}
                    subLabel={unit}
                />
            </div>

            <div className="mt-2 text-xs text-text-muted">
                {Math.round((value / max) * 100)}% of goal
            </div>
        </div>
    );
}
