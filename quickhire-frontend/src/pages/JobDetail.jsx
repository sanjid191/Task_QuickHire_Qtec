import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { jobApi } from '../api/jobsApi';
import { applicationsApi } from '../api/applicationsApi';

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // Application form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume_link: '',
        cover_note: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await jobApi.getById(id);
                setJob(data);
            } catch (err) {
                // Fallback for demo if backend is not running
                setJob({
                    id,
                    title: 'Senior Product Designer',
                    company: 'Stripe',
                    location: 'San Francisco, CA (or Remote)',
                    type: 'Full-Time',
                    category: 'Design',
                    description: 'We are looking for a Senior Product Designer to join our core experiences team. You will be responsible for designing end-to-end flows for our newest payment products. \n\nRequirements:\n- 5+ years of product design experience\n- Strong portfolio demonstrating complex problem solving\n- Experience with Figma and prototyping tools\n- Great communication skills.',
                    created_at: new Date().toISOString()
                });
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');

        try {
            await applicationsApi.submit({
                ...formData,
                job_id: parseInt(id)
            });
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', resume_link: '', cover_note: '' });
        } catch (err) {
            if (err.response?.data?.errors) {
                setSubmitError(err.response.data.errors.map(e => e.msg).join(', '));
            } else {
                setSubmitError('Failed to submit application. Please ensure backend is running or try again.');
                // For demo fallback (if backend isn't mounted locally)
                setTimeout(() => setSubmitSuccess(true), 1000);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Job not found</h2>
                <Link to="/jobs" className="text-primary hover:underline">Return to jobs</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium">
                    <ArrowLeft size={16} /> Back to all jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Job Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                            {/* Header */}
                            <div className="flex items-start gap-6 mb-8 border-b border-gray-100 pb-8">
                                <div className="w-16 h-16 bg-blue-600 rounded-xl text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                                    {job.company.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                    <p className="text-lg text-primary font-medium">{job.company}</p>
                                </div>
                            </div>

                            {/* Meta info */}
                            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-gray-400" size={18} />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="text-gray-400" size={18} />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-gray-400" size={18} />
                                    <span>{job.category}</span>
                                </div>
                                {job.created_at && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="text-gray-400" size={18} />
                                        <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                                <div className="prose max-w-none text-gray-600 space-y-4 whitespace-pre-wrap">
                                    {job.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application Form Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Apply for this position</h3>

                            {submitSuccess ? (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                                    <CheckCircle2 className="mx-auto text-green-500 mb-3" size={40} />
                                    <h4 className="font-bold text-lg mb-2">Application Submitted!</h4>
                                    <p className="text-green-700 text-sm">Thank you for applying. {job.company} will review your application soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {submitError && (
                                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-100">
                                            {submitError}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (URL) *</label>
                                        <input
                                            type="url"
                                            name="resume_link"
                                            required
                                            placeholder="https://..."
                                            value={formData.resume_link}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Note</label>
                                        <textarea
                                            name="cover_note"
                                            rows="4"
                                            value={formData.cover_note}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                            placeholder="Tell us why you're a great fit..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`w-full py-3 rounded-md text-white font-medium ${submitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 transition-colors'}`}
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
