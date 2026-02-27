import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import CompanyLogos from '../components/ui/CompanyLogos';
import CategoryCard from '../components/ui/CategoryCard';
import JobCard from '../components/ui/JobCard';
import { jobApi } from '../api/jobsApi';

export default function Home() {
    const categories = [
        { title: 'Design', count: 235, iconName: 'PenTool', isActive: false },
        { title: 'Sales', count: 756, iconName: 'TrendingUp', isActive: false },
        { title: 'Marketing', count: 140, iconName: 'Megaphone', isActive: false },
        { title: 'Finance', count: 325, iconName: 'Briefcase', isActive: false },
        { title: 'Technology', count: 436, iconName: 'MonitorDrop', isActive: false },
        { title: 'Engineering', count: 542, iconName: 'Code', isActive: false },
        { title: 'Business', count: 211, iconName: 'Briefcase', isActive: false },
        { title: 'Human Resource', count: 346, iconName: 'Users', isActive: false },
    ];

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobApi.getAll({});
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs for Home page", err);
                // Fallback demo data
                setJobs([
                    { id: 1, title: 'Email Marketing', company: 'Revolut', location: 'Madrid, Spain', type: 'Full Time', category: 'Marketing', logoInitial: 'R', logoColor: 'bg-black' },
                    { id: 2, title: 'Brand Designer', company: 'Dropbox', location: 'San Fransisco, US', type: 'Full Time', category: 'Design', logoInitial: 'D', logoColor: 'bg-blue-600' },
                    { id: 3, title: 'Email Marketing', company: 'Pitch', location: 'Berlin, Germany', type: 'Full Time', category: 'Marketing', logoInitial: 'P', logoColor: 'bg-teal-600' },
                    { id: 4, title: 'Visual Designer', company: 'Blinklist', location: 'Granada, Spain', type: 'Full Time', category: 'Design', logoInitial: 'V', logoColor: 'bg-green-500' },
                    { id: 5, title: 'Product Designer', company: 'ClassPass', location: 'Manchester, UK', type: 'Full Time', category: 'Design', logoInitial: 'C', logoColor: 'bg-blue-500' },
                    { id: 6, title: 'Lead Designer', company: 'Canva', location: 'Ontario, Canada', type: 'Full Time', category: 'Design', logoInitial: 'L', logoColor: 'bg-cyan-500' },
                    { id: 7, title: 'Brand Strategist', company: 'GoDaddy', location: 'Marseille, France', type: 'Full Time', category: 'Marketing', logoInitial: 'G', logoColor: 'bg-green-600' },
                    { id: 8, title: 'Data Analyst', company: 'Twitter', location: 'San Diego, US', type: 'Full Time', category: 'Technology', logoInitial: 't', logoColor: 'bg-sky-500' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Split jobs for featured (first 8) and latest (next 4)
    const featuredJobs = jobs.slice(0, 8);
    const latestJobs = jobs.slice(8, 12);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Hero Section */}
            <section className="bg-gray-50 relative pt-12 pb-24 overflow-hidden">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="z-10 relative">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
                            Discover <br />
                            more than <br />
                            <span className="text-accent relative inline-block">
                                5000+ Jobs
                                <svg className="absolute w-[110%] h-4 -bottom-1 left-[-5%] text-accent" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.3855 8.93701C53.7667 4.09062 135.267 1.09062 197.385 5.93701" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-gray-500 text-lg mb-10 max-w-md">
                            Great platform for the job seeker that searching for new career heights and passionate about startups.
                        </p>

                        <SearchBar />

                        <p className="text-sm text-gray-500 mt-4">
                            Popular : UI Designer, UX Researcher, Android, Admin
                        </p>
                    </div>

                    <div className="hidden md:block relative z-10">
                        <img src="/hero-image.png" alt="Happy professional" className="w-full h-auto object-contain max-h-[600px] drop-shadow-2xl translate-y-6" />
                    </div>
                </div>

                {/* Background Decorative Lines */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <svg className="absolute w-full h-full opacity-10" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                                <path d="M25 0L50 14.4v28.9L25 43.4L0 28.9V14.4z" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hexagons)" className="text-primary" />
                    </svg>
                </div>
            </section>

            {/* Company Logos */}
            <CompanyLogos />

            {/* Explore by Category */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Explore by <span className="text-accent">category</span>
                        </h2>
                        <Link to="/jobs" className="text-primary font-medium flex items-center gap-2 hover:underline group">
                            Show all jobs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <CategoryCard
                                key={idx}
                                title={cat.title}
                                count={cat.count}
                                iconName={cat.iconName}
                                isActive={cat.isActive}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 bg-primary text-white overflow-hidden relative">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">
                    <div className="max-w-md">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Start posting jobs today</h2>
                        <p className="font-medium text-lg mb-8">Start posting jobs for only $10.</p>
                        <Link to="/signup" className="inline-block bg-white text-primary font-bold px-8 py-3.5 rounded-md hover:bg-gray-100 transition-colors w-full sm:w-auto text-center">
                            Sign Up For Free
                        </Link>
                    </div>

                    <div className="hidden md:block w-1/2 relative">
                        <div className="bg-gray-100 rounded-lg p-2 shadow-2xl rotate-2 translate-x-12 translate-y-8">
                            <div className="bg-white rounded p-4 h-64 border border-gray-200 shadow-inner flex flex-col">
                                <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
                                <div className="h-32 w-full bg-blue-50 rounded mb-4 flex justify-around items-end pb-2 px-2">
                                    <div className="w-4 h-12 bg-blue-400 rounded-t"></div>
                                    <div className="w-4 h-24 bg-blue-600 rounded-t"></div>
                                    <div className="w-4 h-16 bg-blue-500 rounded-t"></div>
                                    <div className="w-4 h-8 bg-blue-300 rounded-t"></div>
                                </div>
                                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decorative Polygon */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-800 mix-blend-multiply opacity-50 transform -skew-x-12 translate-x-20 z-0"></div>
            </section>

            {/* Featured Jobs */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Featured <span className="text-accent">jobs</span>
                        </h2>
                        <Link to="/jobs" className="text-primary font-medium flex items-center gap-2 hover:underline group">
                            Show all jobs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <div className="col-span-full py-12 text-center text-gray-500">Loading featured jobs...</div>
                        ) : featuredJobs.length > 0 ? (
                            featuredJobs.map(job => (
                                <JobCard key={job.id} {...job} categories={[job.category]} layout="grid" />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500">No jobs found.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest Jobs Open */}
            <section className="py-20 bg-gray-50 bg-opacity-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Latest <span className="text-accent">jobs open</span>
                        </h2>
                        <Link to="/jobs" className="text-primary font-medium flex items-center gap-2 hover:underline group">
                            Show all jobs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {loading ? (
                            <div className="col-span-full py-12 text-center text-gray-500">Loading latest jobs...</div>
                        ) : latestJobs.length > 0 ? (
                            latestJobs.map(job => (
                                <JobCard key={job.id} {...job} categories={[job.category]} layout="list" />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500">No more jobs currently available.</div>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}
