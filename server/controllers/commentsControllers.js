const CommentModel = require('../models/commentModel');

exports.getComments = (req, res) => {
    CommentModel.getAllComments((err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Внутрішня помилка сервера', message: err.message });
        } else {
            res.json(results)
        }
    })
};

exports.postComments = (req, res) => {
    const { name, text, image_id } = req.body;

    CommentModel.addComments(name, text, image_id, (err, results) => {
        if (err) {
            console.error('Помилка при додаванні коментаря', err)
            return res.status(500).json({ error: 'Помилка при додаванні коментаря', message: err.message });
        } else {
            res.json({
                message: 'коментар успішно добавлений',
                data: { name, text, image_id }
            })
        }
    })
};