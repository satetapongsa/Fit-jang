import type { ReactNode } from 'react';
import Navbar from './Navbar';
import { useLocation, Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    // Define pages where Navbar should be hidden
    const hideNavbarPaths = ['/'];
    const showNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background text-text font-sans antialiased flex flex-col lg:flex-row overflow-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />

            {/* Desktop Navigation Sidebar Container */}
            {showNavbar && (
                <div className="hidden lg:flex w-64 xl:w-80 h-screen flex-col border-r border-white/5 z-20 relative glass">
                    <div className="p-8">
                         <Link to="/" className="hover:opacity-80 transition-opacity">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Fitjang</h2>
                         </Link>
                    </div>
                    <Navbar variant="sidebar" />
                </div>
            )}

            {/* Main Application Area */}
            <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
                {/* Mobile Header */}
                {showNavbar && (
                    <header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-center glass sticky top-0 z-30">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tighter">Fitjang</h2>
                        </Link>
                    </header>
                )}

                <main className="flex-1 w-full pb-28 lg:pb-12 overflow-y-auto scrollbar-hide px-4 lg:px-10 pt-safe relative">
                    {children}
                </main>

                {/* Mobile Bottom Navbar Container */}
                {showNavbar && (
                    <div className="lg:hidden">
                        <Navbar variant="bottom" />
                    </div>
                )}
            </div>
        </div>
    );
}
