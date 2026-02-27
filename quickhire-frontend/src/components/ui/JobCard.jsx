import { Link } from 'react-router-dom';

export default function JobCard({
    id,
    title,
    company,
    location,
    type = 'Full Time',
    categories = [],
    logoInitial,
    logoColor = 'bg-gray-900',
    layout = 'grid' // 'grid' | 'list'
}) {
    if (layout === 'list') {
        return (
            <Link to={`/jobs/${id}`} className="block border border-gray-200 rounded-lg p-6 bg-white hover:border-primary/50 transition-colors group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${logoColor} text-white flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                            {logoInitial || company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
                            <p className="text-gray-500 text-sm">{company} • {location}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            {type}
                        </span>
                        {categories.map((cat, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-xs font-medium border border-orange-200 text-orange-500 bg-transparent">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        );
    }

    // Grid Layout
    return (
        <Link to={`/jobs/${id}`} className="block border border-gray-200 rounded-lg p-6 bg-white hover:border-primary/50 transition-colors group h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-lg ${logoColor} text-white flex items-center justify-center text-xl font-bold`}>
                        {logoInitial || company.charAt(0)}
                    </div>
                    <span className="px-3 py-1 text-xs font-medium border border-primary text-primary rounded-md bg-transparent">
                        {type}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                    {company} • {location}
                </p>

                <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                    {company} is looking for {title} to help team and our customers...
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat, i) => {
                    // simple color variation based on index
                    const colors = [
                        'bg-orange-50 text-orange-600',
                        'bg-emerald-50 text-emerald-600',
                        'bg-blue-50 text-blue-600',
                        'bg-purple-50 text-purple-600'
                    ];
                    return (
                        <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${colors[i % colors.length]}`}>
                            {cat}
                        </span>
                    );
                })}
            </div>
        </Link>
    );
}
