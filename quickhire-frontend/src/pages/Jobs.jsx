import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { jobApi } from '../api/jobsApi';
import JobCard from '../components/ui/JobCard';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        category: ''
    });

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await jobApi.getAll(filters);
            setJobs(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            setError('Could not load jobs from the server. Showing mock data instead.');

            // Fallback mock data if server isn't running
            setJobs([
                { id: 1, title: 'Email Marketing', company: 'Revolut', location: 'Madrid, Spain', type: 'Full Time', categories: ['Marketing', 'Design'], logoInitial: 'R', logoColor: 'bg-black' },
                { id: 2, title: 'Brand Designer', company: 'Dropbox', location: 'San Fransisco, US', type: 'Full Time', categories: ['Design', 'Business'], logoInitial: 'D', logoColor: 'bg-blue-600' },
                { id: 3, title: 'Visual Designer', company: 'Blinklist', location: 'Granada, Spain', type: 'Full Time', categories: ['Design'], logoInitial: 'V', logoColor: 'bg-green-500' },
                { id: 4, title: 'Data Analyst', company: 'Twitter', location: 'San Diego, US', type: 'Full Time', categories: ['Technology'], logoInitial: 't', logoColor: 'bg-sky-500' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line
    }, []); // Initial load only, manual search triggers subsequent fetches

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-20">

            {/* Search Header */}
            <div className="bg-white py-12 border-b border-gray-200">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Find your <span className="text-accent">dream job</span></h1>

                    <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow border border-gray-100 flex flex-col md:flex-row items-center gap-2">
                        <div className="flex items-center gap-3 px-4 py-2 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100">
                            <Search className="text-gray-400" size={20} />
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Job title or keyword"
                                className="w-full focus:outline-none text-gray-800"
                            />
                        </div>

                        <button type="submit" className="bg-primary text-white w-full md:w-auto px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-10">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 hidden md:block sticky top-24">
                            <h2 className="font-bold text-lg mb-6 text-gray-900">Filters</h2>

                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                    <MapPin size={16} /> Location
                                </label>
                                <select
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                >
                                    <option value="">All Locations</option>
                                    <option value="Madrid">Madrid, Spain</option>
                                    <option value="San Fransisco">San Fransisco, US</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                    <Briefcase size={16} /> Category
                                </label>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                >
                                    <option value="">All Categories</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>

                            <button
                                onClick={fetchJobs}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium transition-colors text-sm"
                            >
                                Apply Filters
                            </button>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <div className="md:hidden flex justify-between items-center mb-4">
                            <span className="font-medium text-gray-600">{jobs.length} jobs found</span>
                            <button className="bg-white border border-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                                Show Filters
                            </button>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1">
                        {error && (
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center h-48">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : jobs.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {jobs.map(job => (
                                    <JobCard key={job.id} {...job} layout="list" />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg border border-gray-200 flex flex-col items-center">
                                <Briefcase size={48} className="text-gray-300 mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-500 max-w-sm">Try adjusting your search criteria, category, or location filters to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
