import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white py-4 shadow-sm relative z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">Q</span>
                    </div>
                    <span className="font-bold text-xl text-dark">QuickHire</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/jobs" className="text-gray-600 hover:text-primary font-medium">Find Jobs</Link>
                    <a href="#" className="text-gray-600 hover:text-primary font-medium">Browse Companies</a>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login" className="text-primary font-medium hover:text-primary/80">Login</Link>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <Link to="/signup" className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">Sign Up</Link>
                </div>

                {/* Mobile Hamburger Icon */}
                <button className="md:hidden text-dark" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Slide-in */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4 md:hidden">
                    <Link to="/jobs" className="text-gray-800 font-medium py-2 border-b border-gray-50" onClick={() => setIsOpen(false)}>Find Jobs</Link>
                    <a href="#" className="text-gray-800 font-medium py-2 border-b border-gray-50" onClick={() => setIsOpen(false)}>Browse Companies</a>
                    <div className="flex flex-col gap-3 mt-4">
                        <Link to="/login" className="text-center text-primary font-medium py-2 border border-primary rounded-md" onClick={() => setIsOpen(false)}>Login</Link>
                        <Link to="/signup" className="text-center bg-primary text-white py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
