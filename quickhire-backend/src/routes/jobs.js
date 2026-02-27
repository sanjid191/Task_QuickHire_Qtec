const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const jobController = require('../controllers/jobController');
const { handleValidationErrors } = require('../middleware/validate');

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.delete('/:id', jobController.deleteJob);

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    handleValidationErrors,
    jobController.createJob
);

module.exports = router;
