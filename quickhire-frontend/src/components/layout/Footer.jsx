import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-16 pb-8 text-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Q</span>
                            </div>
                            <span className="font-bold text-xl">QuickHire</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    {/* Links: About */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">About</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Advice</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Links: Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Resources</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help Docs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Get job notifications</h3>
                        <p className="text-gray-400 mb-4">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
                    <p>2026 @ QuickHire. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                            <span className="sr-only">Facebook</span>f
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                            <span className="sr-only">Instagram</span>ig
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                            <span className="sr-only">Dribbble</span>d
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                            <span className="sr-only">LinkedIn</span>in
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                            <span className="sr-only">Twitter</span>tw
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
