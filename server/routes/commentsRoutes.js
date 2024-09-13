const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsControllers');

router.get('/comments', commentsController.getComments);

router.post('/comments', commentsController.postComments)

module.exports = router;