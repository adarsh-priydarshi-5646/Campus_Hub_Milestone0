const express = require('express');
const router = express.Router();
const { getTimetable } = require('../controllers/timetableController');

router.get('/:semesterId', getTimetable);
module.exports = router;
