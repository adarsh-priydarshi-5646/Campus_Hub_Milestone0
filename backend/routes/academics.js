const express = require('express');
const router = express.Router();
const { getSemesters, getSubjects, getSemesterDetails } = require('../controllers/academicsController');

router.get('/semesters', getSemesters);
router.get('/subjects/:semesterId', getSubjects);
router.get('/details/:semesterId', getSemesterDetails);

module.exports = router;
