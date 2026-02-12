import { LayoutDashboard, CalendarDays, Utensils, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
        { icon: CalendarDays, label: 'Schedule', path: '/schedule' },
        // Floating Center Button Concept? Maybe later. For now standard tab bar.
        { icon: Utensils, label: 'Tracker', path: '/tracker' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    // Visibility is controlled here and in Layout
    if (location.pathname === '/') return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass pb-safe">
            <div className="flex justify-between items-center px-6 h-20 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative group flex flex-col items-center justify-center w-16 h-full"
                        >
                            {/* Active Indicator Splash */}
                            {isActive && (
                                <div className="absolute -top-[1px] w-8 h-[2px] bg-primary shadow-[0_2px_10px_rgba(16,185,129,0.7)] rounded-full animate-pulse-slow" />
                            )}

                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                isActive
                                    ? "text-primary -translate-y-1"
                                    : "text-text-muted hover:text-text"
                            )}>
                                <item.icon
                                    size={isActive ? 26 : 24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>

                            <span className={cn(
                                "text-[10px] font-medium transition-all duration-300 absolute bottom-3",
                                isActive
                                    ? "text-primary opacity-100 translate-y-0"
                                    : "text-text-muted opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
