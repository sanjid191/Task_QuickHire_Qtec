const db = require('../config/db');

// @route   POST /api/applications
// @desc    Submit a job application
exports.submitApplication = async (req, res) => {
    try {
        const { job_id, name, email, resume_link, cover_note } = req.body;

        // Check if job exists
        const jobCheck = await db.query('SELECT id FROM jobs WHERE id = $1', [job_id]);
        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        const { rows } = await db.query(
            'INSERT INTO applications (job_id, name, email, resume_link, cover_note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [job_id, name, email, resume_link, cover_note]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
