const express = require('express');
const { getRooms } = require('../controllers/roomController');
const router = express.Router();

router.route('/').get(getRooms);

module.exports = router;
