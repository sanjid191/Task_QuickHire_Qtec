import { Search, MapPin } from 'lucide-react';

export default function SearchBar() {
    return (
        <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-2 max-w-4xl w-full">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full focus:outline-none text-gray-800 placeholder-gray-400"
                />
            </div>

            {/* Location Input */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full">
                <MapPin className="text-gray-400" size={20} />
                <select className="w-full bg-transparent focus:outline-none text-gray-800 text-base appearance-none cursor-pointer">
                    <option value="Florence, Italy">Florence, Italy</option>
                    <option value="London, UK">London, UK</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            {/* Search Button */}
            <button className="bg-primary text-white w-full md:w-auto px-8 py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Search my job
            </button>
        </div>
    );
}
