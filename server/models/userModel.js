const connection = require('../config/db');

const UserModel = {
    create: (first_name, last_name, birthday, email, password, callback) => {
        const query = 'INSERT INTO authentication(first_name, last_name, birthday, email, password) VALUES(?,?,?,?,?)';
        connection.query(query, [first_name, last_name, birthday, email, password], (err, result) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    findEmailUser: (email, callback) => {
        const query = 'SELECT * FROM authentication WHERE email = ?'
        connection.query(query, [email], (err, results) => {
         if(err) {
            return callback(err)
         } else {
            return callback(null, results)
         }
        })
    }
};

module.exports = UserModel;