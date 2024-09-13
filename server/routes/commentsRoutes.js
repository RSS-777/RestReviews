const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/comments', (req, res) => {
    connection.query('SELECT * FROM comment_post', (err, results) => {
        if (err) {
            console.error(err)
        } else {
            res.json(results)
        }
    })
});

router.post('/comments', (req, res) => {
    const { name, text, image_id } = req.body;

    connection.query('INSERT INTO comment_post(name, text, image_id)  VALUES(?, ?, ?)', [name, text, image_id], (err, results) => {
        if (err) {
            console.error('Помилка при додаванні коментаря', err)
        } else {
            res.json({
                message: 'коментар успішно добавлений',
                data: { name, text, image_id }
            })
        }
    })
})

module.exports = router;