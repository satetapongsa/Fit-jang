
type SimpleLineChartProps = {
    data: number[];
    color?: string;
    height?: number;
    label?: string;
};

export default function SimpleLineChart({ data, color = '#3b82f6', height = 60, label }: SimpleLineChartProps) {
    if (!data || data.length < 2) {
        return <div className="text-xs text-text-muted flex items-center justify-center h-full">Not enough data</div>;
    }

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1; // Avoid divide by zero

    // Normalize points between 0 and 100
    const points = data.map((val, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((val - min) / range) * 100; // Invert Y because SVG coordinates
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="relative w-full" style={{ height: `${height}px` }}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
            >
                {/* Gradient Fill - Optional */}
                <defs>
                    <linearGradient id={`gradient-${label}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area under curve */}
                <polygon
                    points={`0,100 ${points} 100,100`}
                    fill={`url(#gradient-${label})`}
                />

                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Dots */}
                {data.map((val, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - ((val - min) / range) * 100;
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill="white"
                            stroke={color}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    )
                })}
            </svg>
            {label && <div className="absolute top-0 right-0 text-[10px] text-text-muted bg-surface/80 px-1 rounded">{label}</div>}
        </div>
    );
}
