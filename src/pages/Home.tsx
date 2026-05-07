import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Activity, Calendar, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background w-full">
            {/* Immersive Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-screen-2xl px-6 py-20 flex flex-col items-center text-center space-y-16 animate-fade-in">
                <div className="space-y-4 max-w-3xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-surfaceHighlight border border-white/10 text-xs font-medium text-primary mb-2 shadow-inner">
                        v2.0 Now Available
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                        Transform Your Body with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Fitjang</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-lg mx-auto leading-relaxed">
                        The premium all-in-one platform to track workouts, nutrition, and sleep.
                        <br />Smart planning for a healthier you.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md mx-auto">
                    <Link to="/profile" className="w-full">
                        <Button size="lg" className="w-full group rounded-2xl h-16 text-xl shadow-lg shadow-primary/25" variant="primary">
                            Get Started Now <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl text-left">
                    <div className="p-6 rounded-3xl glass-card hover:border-primary/50 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <Activity className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Smart Tracking</h3>
                        <p className="text-text-muted text-sm">Log your daily activities including food, water, and sleep cycles effortlessly.</p>
                    </div>
                    <div className="p-6 rounded-3xl glass-card hover:border-secondary/50 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                            <Calendar className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Flexible Scheduling</h3>
                        <p className="text-text-muted text-sm">Customize your workout frequency from 1 to 7 days a week to fit your lifestyle.</p>
                    </div>
                    <div className="p-6 rounded-3xl glass-card hover:border-accent/50 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                            <Zap className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Instant Plans</h3>
                        <p className="text-text-muted text-sm">Get auto-generated workout routines tailored to your specific goals and body type.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
