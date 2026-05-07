import { LayoutDashboard, CalendarDays, Utensils, User, Plus, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

interface NavbarProps {
    variant?: 'bottom' | 'sidebar';
}

export default function Navbar({ variant = 'bottom' }: NavbarProps) {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Plan', path: '/dashboard' },
        { icon: CalendarDays, label: 'Calendar', path: '/schedule' },
        { icon: Plus, label: 'Track', path: '/tracker', isCenter: true },
        { icon: Utensils, label: 'Fuel', path: '/food-diary' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    if (location.pathname === '/') return null;

    if (variant === 'sidebar') {
        return (
            <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
                <div className="mb-4 px-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Navigation</div>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-text-muted hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon
                                size={22}
                                className={cn(
                                    "transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-primary" : "text-text-muted"
                                )}
                            />
                            <span className="font-semibold text-sm">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(14,165,233,1)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>
        );
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-2">
            <div className="max-w-2xl mx-auto glass rounded-[32px] h-20 flex justify-around items-center px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    if (item.isCenter) {
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="relative -top-10 group"
                            >
                                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-[0_8px_25px_rgba(14,165,233,0.5)] border-4 border-background relative z-10 transform group-active:scale-90 transition-all duration-200">
                                    <Plus size={32} className="text-white" />
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                     <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest transition-colors",
                                        isActive ? "text-primary" : "text-text-muted"
                                     )}>{item.label}</span>
                                </div>
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex flex-col items-center justify-center gap-1 group flex-1 pt-2"
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-300 transform group-active:scale-95",
                                isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-text-muted group-hover:text-text"
                            )}>
                                <item.icon
                                    size={24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-tighter transition-all duration-300",
                                isActive ? "text-primary opacity-100" : "text-text-muted opacity-60"
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
