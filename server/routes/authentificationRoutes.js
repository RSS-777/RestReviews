const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentificationControllers')

router.post('/registration', authController.authRegistration);
router.post('/login', authController.authLogin)
router.get('/user', authController.authUser)
router.post('/logout', authController.authLogout)

module.exports = router;