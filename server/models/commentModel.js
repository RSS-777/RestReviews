const connection = require('../config/db');

const CommentModel = {
    getAllComments: (callBack) => {
        const query = 'SELECT * FROM comment_post';
        connection.query(query, (err, results) => {
            if (err) {
                return callBack(err)
            } else {
                return callBack(null, results)
            }
        })
    },
    addComments: (name, text, image_id, callBack) => {
        const query = 'INSERT INTO comment_post(name, text, image_id)  VALUES(?, ?, ?)';
        connection.query(query, [name, text, image_id], (err, results) => {
            if (err) {
                return callBack(err)
            } else {
                return callBack(null, results)
            }
        })
    }
};

module.exports = CommentModel;