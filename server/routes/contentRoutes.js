const express = require('express');
const router = express.Router()
const contentController = require('../controllers/contentController');

router.get('/page/home', contentController.getPageHome);
router.get('/page/about', contentController.getPageAbout);
router.get('/page/contact', contentController.getPageContact);

router.post('/page/about', contentController.postPageAbout);
router.post('/page/contact', contentController.postPageContact);
router.post('/page/home', contentController.postPageHome);
router.post('/page/block', contentController.postChangeBlock);


module.exports = router