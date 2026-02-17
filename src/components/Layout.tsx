import type { ReactNode } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    // Define pages where Navbar should be hidden
    const hideNavbarPaths = ['/'];
    const showNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background text-text font-sans antialiased flex flex-col justify-center items-center overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />

            {/* Mobile App Container */}
            <div className="w-full max-w-md min-h-screen bg-transparent relative flex flex-col z-10">
                {/* Main Content Area */}
                <main className="flex-1 w-full pb-28 overflow-y-auto scrollbar-hide px-4 pt- safe">
                    {children}
                </main>

                {/* Navbar */}
                {showNavbar && <Navbar />}
            </div>
        </div>
    );
}
