const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');

router.get('/users', users.getAllUsers);
router.post('/users', users.updateUserRole);

module.exports = router;