const express = require('express');
const router = express.Router();
const { getAllMembers } = require('../controllers/memberController');

router.get('/', getAllMembers);

module.exports = router;
