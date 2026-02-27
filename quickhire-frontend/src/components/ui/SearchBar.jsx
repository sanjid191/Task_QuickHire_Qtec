import { useState } from 'react';
import { Search, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Build the query string
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);

        // Navigate to jobs page with the query params
        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-2 max-w-4xl w-full">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Job title or keyword"
                    className="w-full focus:outline-none text-gray-800 placeholder-gray-400"
                />
            </div>

            {/* Category Input */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full">
                <Briefcase className="text-gray-400" size={20} />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-800 text-base appearance-none cursor-pointer"
                >
                    <option value="">All Categories</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Technology">Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Human Resource">Human Resource</option>
                </select>
            </div>

            {/* Search Button */}
            <button type="submit" className="bg-primary text-white w-full md:w-auto px-8 py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Search my job
            </button>
        </form>
    );
}
