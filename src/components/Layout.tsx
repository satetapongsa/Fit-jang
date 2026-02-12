import type { ReactNode } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    console.log("Layout: Rendering...");
    const location = useLocation();
    console.log("Layout: Current location:", location.pathname);

    // Define pages where Navbar should be hidden
    const hideNavbarPaths = ['/', '/profile'];
    const showNavbar = !hideNavbarPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background text-text font-sans antialiased flex flex-col overflow-x-hidden selection:bg-primary/20">
            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[1200px] mx-auto pb-20 md:pb-0">
                {children}
            </main>

            {/* Navbar - Fixed at bottom for mobile, top/sticky for desktop if needed, currently styled in component */}
            {showNavbar && <Navbar />}
        </div>
    );
}
