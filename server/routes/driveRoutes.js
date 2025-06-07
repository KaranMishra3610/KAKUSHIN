const express = require('express');
const { getDrives, createDrive, rsvpDrive } = require('../controllers/driveController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getDrives);
router.post('/', protect, createDrive);
router.post('/:id/rsvp', protect, rsvpDrive);

module.exports = router;
