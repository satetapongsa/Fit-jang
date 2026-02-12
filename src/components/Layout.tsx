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
        <div className="min-h-screen bg-background text-text font-sans antialiased flex flex-col justify-center items-center">
            {/* Mobile App Container */}
            <div className="w-full max-w-lg min-h-screen bg-background relative shadow-2xl overflow-hidden flex flex-col">
                {/* Main Content Area */}
                <main className="flex-1 w-full pb-24 overflow-y-auto scrollbar-hide">
                    {children}
                </main>

                {/* Navbar */}
                {showNavbar && <Navbar />}
            </div>
        </div>
    );
}
