
type BarData = {
    label: string;
    value: number;
    color: string;
    max?: number; // Optional max value for scale, otherwise max of data is used
};

type SimpleBarChartProps = {
    data: BarData[];
    height?: number;
    showValue?: boolean;
};

export default function SimpleBarChart({ data, height = 150, showValue = true }: SimpleBarChartProps) {
    const maxValue = Math.max(...data.map(d => d.max || d.value), 10); // Minimum scale of 10 to avoid div by zero

    return (
        <div className="flex items-end justify-between gap-2 w-full" style={{ height: `${height}px` }}>
            {data.map((item, index) => {
                const heightPercent = Math.min((item.value / maxValue) * 100, 100);

                return (
                    <div key={index} className="flex flex-col items-center justify-end h-full flex-1 group relative">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                            {item.label}: {item.value}
                        </div>

                        {/* Value Label */}
                        {showValue && (
                            <span className="text-[10px] text-text-muted mb-1 font-medium">{item.value}</span>
                        )}

                        {/* Bar */}
                        <div
                            className="w-full max-w-[20px] rounded-t-sm transition-all duration-500 ease-out hover:brightness-110"
                            style={{
                                height: `${heightPercent}%`,
                                backgroundColor: item.color
                            }}
                        />

                        {/* Axis Label */}
                        <span className="text-[10px] text-text-muted mt-2 truncate w-full text-center">{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
