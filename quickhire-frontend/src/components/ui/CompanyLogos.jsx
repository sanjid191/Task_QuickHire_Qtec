export default function CompanyLogos() {
    return (
        <section className="py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <p className="text-gray-500 mb-8 font-medium">Companies we helped grow</p>
                <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-4 border-gray-800 relative overflow-hidden">
                            <div className="absolute inset-0 border-4 border-white rounded-full"></div>
                        </div>
                        <span className="text-2xl font-bold font-serif text-gray-800">vodafone</span>
                    </div>
                    <div className="text-3xl font-bold tracking-tighter text-gray-800">intel.</div>
                    <div className="text-2xl font-bold tracking-widest text-gray-800 uppercase">Tesla</div>
                    <div className="text-3xl font-bold tracking-tight text-gray-800">AMD<span className="text-primary text-4xl leading-none">↗</span></div>
                    <div className="text-3xl font-bold text-gray-800 font-serif">Talkit</div>
                </div>
            </div>
        </section>
    );
}
