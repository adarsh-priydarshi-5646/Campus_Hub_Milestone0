const express = require('express');
const router = express.Router();
const { getHostels } = require('../controllers/hostelController');

router.get('/', getHostels);
module.exports = router;
