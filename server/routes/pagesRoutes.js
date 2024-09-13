const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'pages', 'index.html'))
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'pages', 'contact.html'))
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..','pages', 'about.html'))
});

router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'pages/registration.html'))
});

module.exports = router;