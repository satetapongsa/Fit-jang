import { LayoutDashboard, CalendarDays, Utensils, User, PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
        { icon: CalendarDays, label: 'Schedule', path: '/schedule' },
        { icon: PlusCircle, label: 'Log', path: '/food-diary', isGenerative: true }, // Central action button
        { icon: Utensils, label: 'Diet', path: '/food-diary' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    if (location.pathname === '/') return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 w-full max-w-md mx-auto">
            <div className="glass rounded-2xl h-16 flex justify-between items-center px-2 shadow-2xl">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    if (item.isGenerative) {
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="relative -top-6 group"
                            >
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-background transform group-hover:scale-110 transition-transform duration-200">
                                    <PlusCircle size={28} className="text-white" />
                                </div>
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative group flex-1 flex flex-col items-center justify-center h-full"
                        >
                            <div className={cn(
                                "p-1.5 rounded-xl transition-all duration-300",
                                isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-text-muted group-hover:text-text"
                            )}>
                                <item.icon
                                    size={isActive ? 24 : 22}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
