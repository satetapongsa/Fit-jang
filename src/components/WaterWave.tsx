

interface WaterWaveProps {
    percentage: number;
}

export default function WaterWave({ percentage }: WaterWaveProps) {
    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-blue-900/20 border-4 border-blue-500/30 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            {/* Wave Container */}
            <div 
                className="absolute inset-0 transition-all duration-1000 ease-in-out"
                style={{ transform: `translateY(${100 - clampedPercentage}%)` }}
            >
                {/* Wave 1 */}
                <div className="absolute top-0 left-[-50%] w-[200%] h-[200%] bg-blue-500/40 rounded-[40%] animate-[wave_7s_infinite_linear]" />
                {/* Wave 2 */}
                <div className="absolute top-0 left-[-50%] w-[200%] h-[200%] bg-blue-400/30 rounded-[35%] animate-[wave_10s_infinite_linear]" />
                {/* Surface Shine */}
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-white/20 to-transparent" />
            </div>

            {/* Percentage Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <span className="text-5xl lg:text-7xl font-bold text-white drop-shadow-lg">{clampedPercentage.toFixed(0)}%</span>
                <p className="text-xs lg:text-sm text-blue-200 mt-1 font-bold tracking-widest uppercase opacity-80">Hydrated</p>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes wave {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
