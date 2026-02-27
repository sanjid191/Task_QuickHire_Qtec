import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function CategoryCard({ title, count, iconName, isActive }) {
    const Icon = Icons[iconName] || Icons.Briefcase;

    return (
        <div
            className={`group cursor-pointer border rounded-md p-6 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 transition-all duration-300 ${isActive
                ? 'bg-primary border-primary text-white'
                : 'bg-white border-gray-200 hover:bg-primary hover:border-primary hover:shadow-lg'
                }`}
        >
            <div className="flex items-center md:items-start md:flex-col gap-4">
                <div className={`p-3 rounded-lg transition-colors duration-300 ${isActive ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-white/20'}`}>
                    <Icon className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-primary group-hover:text-white'}`} size={24} />
                </div>
                <div>
                    <h3 className={`font-semibold text-lg mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>
                        {title}
                    </h3>
                    <p className={`transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'}`}>
                        {count} jobs available
                    </p>
                </div>
            </div>
            <div className={`md:mt-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                <ArrowRight size={20} />
            </div>
        </div>
    );
}
