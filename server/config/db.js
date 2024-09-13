const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'serj',
    password: '2000',
    database: 'comment_db'
});

connection.connect((err) => {
    if (err) return console.error('Помилка підключення', err.message)
    console.log('Підключенно до бази MySql')
});

module.exports = connection