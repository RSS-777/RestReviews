const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesControllers')

router.get('/', pagesController.renderHomePage);

router.get('/contact', pagesController.renderContactPage);

router.get('/about', pagesController.renderAboutPage);

router.get('/registration', pagesController.renderRegistrationPage);

module.exports = router;