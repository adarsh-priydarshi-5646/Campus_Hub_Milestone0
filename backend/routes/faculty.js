const express = require('express');
const router = express.Router();
const { getFaculty, getTeacherById } = require('../controllers/facultyController');

router.get('/', getFaculty);
router.get('/:id', getTeacherById);

module.exports = router;
