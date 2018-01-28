const express = require('express');
const router = express.Router();

const member_controller = require('../controllers/member.controller.js');

router.get('/all', member_controller.findAll);

module.exports = router;
