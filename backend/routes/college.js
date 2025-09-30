const express = require('express');
const router = express.Router();
const { getCollegeDetails } = require('../controllers/collegeController');

router.get('/', getCollegeDetails);

module.exports = router;
