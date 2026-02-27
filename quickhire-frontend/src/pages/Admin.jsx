import { useState, useEffect } from 'react';
import { Trash2, Plus, Briefcase } from 'lucide-react';
import { jobApi } from '../api/jobsApi';

export default function Admin() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    // New job form state
    const [loadingForm, setLoadingForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        category: 'Design',
        type: 'Full Time',
        description: ''
    });

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await jobApi.getAll({});
            setJobs(data);
            setError(null);
        } catch (err) {
            setError('Could not connect to backend. Data listed below is mock data.');
            // Fallback
            setJobs([
                { id: 1, title: 'Email Marketing', company: 'Revolut', location: 'Madrid, Spain', category: 'Marketing', type: 'Full Time', created_at: new Date().toISOString() },
                { id: 2, title: 'Brand Designer', company: 'Dropbox', location: 'San Fransisco, US', category: 'Design', type: 'Full Time', created_at: new Date().toISOString() }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingForm(true);
        setError(null);
        setSuccessMsg('');

        try {
            await jobApi.create(formData);
            setSuccessMsg('Job created successfully!');
            setFormData({
                title: '', company: '', location: '', category: 'Design', type: 'Full Time', description: ''
            });
            fetchJobs();
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(err.response.data.errors.map(e => e.msg).join(', '));
            } else {
                setError('Failed to create job.');
                // For fallback mock behavior
                const newJob = { ...formData, id: Date.now(), created_at: new Date().toISOString() };
                setJobs([newJob, ...jobs]);
                setSuccessMsg('Mock job created (backend disconnected).');
                setFormData({ title: '', company: '', location: '', category: 'Design', type: 'Full Time', description: '' });
            }
        } finally {
            setLoadingForm(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            await jobApi.delete(id);
            setSuccessMsg('Job deleted successfully!');
            fetchJobs();
        } catch (err) {
            setError('Failed to delete job.');
            // Mock fallback
            setJobs(jobs.filter(j => j.id !== id));
            setSuccessMsg('Mock job deleted.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-3 mb-8">
                    <Briefcase className="text-primary" size={32} />
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6 text-sm">
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 text-sm">
                        {successMsg}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Create Job Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Plus size={20} className="text-primary" /> Post New Job
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                    <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" placeholder="e.g. Senior Designer" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                                    <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" placeholder="e.g. Acme Corp" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                    <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" placeholder="e.g. Remote, or City, Country" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none">
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea name="description" required rows="5" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none" placeholder="Full job description..."></textarea>
                                </div>

                                <button type="submit" disabled={loadingForm} className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                                    {loadingForm ? 'Posting...' : 'Post Job'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Manage Jobs Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Manage Postings</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                            <th className="px-6 py-4 font-medium">Job Title / Company</th>
                                            <th className="px-6 py-4 font-medium">Category</th>
                                            <th className="px-6 py-4 font-medium">Date Posted</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading jobs...</td>
                                            </tr>
                                        ) : jobs.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No jobs posted yet.</td>
                                            </tr>
                                        ) : (
                                            jobs.map(job => (
                                                <tr key={job.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-gray-900">{job.title}</div>
                                                        <div className="text-sm text-gray-500">{job.company} • {job.location}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                                            {job.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={() => handleDelete(job.id)}
                                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors"
                                                            title="Delete Job"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
