const connection = require('../config/db');

const UserModel = {
    create: (first_name, last_name, birthday, email, password, callback) => {
        const query = 'INSERT INTO authentication(first_name, last_name, birthday, email, password) VALUES(?,?,?,?,?)';
        connection.query(query, [first_name, last_name, birthday, email, password], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    findEmailUser: (email, callback) => {
        const query = 'SELECT * FROM authentication WHERE email = ?'
        connection.query(query, [email], (err, results) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, results)
            }
        })
    },
    getAllUsers: (callback) => {
        const query = `
        SELECT 
        authentication.authentication_id, 
        authentication.first_name, 
        authentication.last_name, 
        authentication.birthday, 
        authentication.email, 
        roles.role_name 
        FROM 
        authentication 
        JOIN 
        roles 
        ON 
        authentication.role_id = roles.role_id
        `;
        connection.query(query, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    updateUserRole: (userId, newRoleId, callback) => {
        const query = `UPDATE authentication SET role_id = ? WHERE authentication_id = ?`;
        connection.query(query, [newRoleId, userId], (err, result) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    }
};

module.exports = UserModel;