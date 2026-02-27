const db = require('../config/db');

// @route   GET /api/jobs
// @desc    Get all jobs (with optional search, category, location)
exports.getJobs = async (req, res) => {
    try {
        const { search, category, location } = req.query;

        let queryArgs = [];
        let queryConditions = [];

        let baseQuery = 'SELECT * FROM jobs';

        if (search) {
            queryArgs.push(`%${search}%`);
            queryConditions.push(`(title ILIKE $${queryArgs.length} OR description ILIKE $${queryArgs.length} OR company ILIKE $${queryArgs.length})`);
        }
        if (category) {
            queryArgs.push(category);
            queryConditions.push(`category = $${queryArgs.length}`);
        }
        if (location) {
            queryArgs.push(`%${location}%`);
            queryConditions.push(`location ILIKE $${queryArgs.length}`);
        }

        if (queryConditions.length > 0) {
            baseQuery += ' WHERE ' + queryConditions.join(' AND ');
        }

        baseQuery += ' ORDER BY created_at DESC';

        const { rows } = await db.query(baseQuery, queryArgs);
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/jobs/:id
// @desc    Get single job
exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/jobs
// @desc    Create a job (Admin)
exports.createJob = async (req, res) => {
    try {
        const { title, company, location, category, type, description } = req.body;

        const { rows } = await db.query(
            'INSERT INTO jobs (title, company, location, category, type, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, company, location, category, type || 'Full-Time', description]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const { rowCount } = await db.query('DELETE FROM jobs WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        res.json({ msg: 'Job deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
