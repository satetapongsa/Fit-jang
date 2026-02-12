import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Activity, Calendar, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col h-full justify-center">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-8 animate-fade-in">
                <div className="space-y-4 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Transfrom Your Body with <span className="text-primary">Fitjang</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-lg mx-auto">
                        The all-in-one platform to track workouts, nutrition, and sleep.
                        Smart planning for a healthier you.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md">
                    <Link to="/profile" className="w-full">
                        <Button size="lg" className="w-full group">
                            Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link to="/dashboard" className="w-full">
                        <Button variant="outline" size="lg" className="w-full">
                            Sign In
                        </Button>
                    </Link>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl text-left">
                    <div className="p-6 rounded-2xl bg-surface/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-colors">
                        <Activity className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
                        <p className="text-text-muted">Log your daily activities including food, water, and sleep cycles effortlessly.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-surface/50 border border-border backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                        <Calendar className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                        <p className="text-text-muted">Customize your workout frequency from 1 to 7 days a week to fit your lifestyle.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-surface/50 border border-border backdrop-blur-sm hover:border-purple-500/50 transition-colors">
                        <Zap className="w-8 h-8 text-purple-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Instant Plans</h3>
                        <p className="text-text-muted">Get auto-generated workout routines tailored to your specific goals and body type.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
