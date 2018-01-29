const express = require('express');
const router = express.Router();

const member_controller = require('../controllers/member.controller.js');

router.get('/all', member_controller.findAll);
router.post('/create', member_controller.member_create);
router.get('/:member_id', member_controller.member_find);
router.put('/:member_id', member_controller.member_update);
router.delete('/:member_id', member_controller.member_delete);

module.exports = router;
