import { LayoutDashboard, CalendarDays, Utensils, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
        { icon: CalendarDays, label: 'Schedule', path: '/schedule' },
        { icon: Utensils, label: 'Tracker', path: '/tracker' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    // Note: Visibility is now largely controlled by Layout, but this double check doesn't hurt.
    if (location.pathname === '/') return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-border p-2 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
            <div className="max-w-screen-xl mx-auto flex justify-around md:justify-end md:gap-8">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                                isActive ? "text-primary" : "text-text-muted hover:text-text"
                            )}
                        >
                            <item.icon size={24} />
                            <span className="text-xs mt-1 md:text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
