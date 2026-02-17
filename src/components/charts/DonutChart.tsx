import { motion } from 'framer-motion';

interface DonutChartProps {
    value: number;
    max: number;
    color?: string; // Hex or tailwind class mapped
    label?: string;
    subLabel?: string;
    size?: number;
    strokeWidth?: number;
}

export default function DonutChart({
    value,
    max,
    color = '#0ea5e9',
    label,
    subLabel,
    size = 120,
    strokeWidth = 10
}: DonutChartProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(value / max, 0), 1);
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-surfaceHighlight"
                />

                {/* Progress Circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ strokeDasharray: circumference }}
                />
            </svg>

            {/* Inner Content */}
            {(label || subLabel) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    {label && <span className="text-xl font-bold font-sans">{label}</span>}
                    {subLabel && <span className="text-xs text-text-muted">{subLabel}</span>}
                </div>
            )}
        </div>
    );
}
