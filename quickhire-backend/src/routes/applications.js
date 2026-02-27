const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const applicationController = require('../controllers/applicationController');
const { handleValidationErrors } = require('../middleware/validate');

router.post(
    '/',
    [
        check('job_id', 'Job ID is required').not().isEmpty(),
        check('job_id', 'Job ID must be a number').isNumeric(),
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('resume_link', 'Please include a valid URL for resume').isURL(),
    ],
    handleValidationErrors,
    applicationController.submitApplication
);

router.get('/', applicationController.getAllApplications);

module.exports = router;
