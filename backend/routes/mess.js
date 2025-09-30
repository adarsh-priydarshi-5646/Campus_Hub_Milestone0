const express = require('express');
const router = express.Router();
const { getMess } = require('../controllers/messController');

router.get('/', getMess);
module.exports = router;
