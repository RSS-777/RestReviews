const connection = require('../config/db');
const bcrypt = require('bcrypt');

// Реєстрація
exports.authRegistration = async (req, res) => {
    const { firstName, lastName, email, password, birthday } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!firstName || !lastName || !birthday || !email || !hashedPassword) {
        return res.status(400).json({
            message: 'Будь ласка, заповніть всі поля.',
            error: 'status(400)'
        });
    }

    connection.query('INSERT INTO authentication(first_name, last_name, birthday, email, password) VALUES(?,?,?,?,?)', [firstName, lastName, birthday, email, hashedPassword], (err, results) => {

        if (err) {
            console.log('Помилка при додаванні форми в базу даних')
            res.status(500).json({
                message: 'Сталася помилка: можливо такий користувач вже існує!',
                error: err.message
            })
        } else {
            res.status(200).json({
                message: 'данні з регістрації успішно добавлені в базу даних',
                data: firstName
            })
        }
    })
};

// Вхід користувача на сайт
exports.authLogin = (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM authentication WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({
                error: 'Такого користувача не існує!'
            })
        }
        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Невірний пароль!' })
        } else {
            console.log('login:', ' Вхід успішний в сесію!')
            req.session.user = { id: user.id, email: user.email, firstName: user.first_name }; // Збереження інформації про користувача у сесії
            res.json({
                message: 'Вхід успішний',
                user: { firstName: user.first_name }
            })
        }
    })
};

//Отримання інформації про користувача
exports.authUser = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json({ user: null })
    }
};

// Виход із сесії
exports.authLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('logout:', 'Помилка при завершенні сесії', err)
            return res.status(500).json({ message: 'Помилка при завершенні сесії' })
        }
        console.log('logout:', ' Сесія успішно завершена')
        res.clearCookie('connect.sid'); // Очищення cookie сесії
        return res.status(200).json({ message: 'Сесія завершена' })
    })
};



// // Реєстрація
// exports.authRegistration = async (req, res) => {
//     const { firstName, lastName, email, password, birthday } = req.body
//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (!firstName || !lastName || !birthday || !email || !hashedPassword) {
//         return res.status(400).json({
//             message: 'Будь ласка, заповніть всі поля.',
//             error: 'status(400)'
//         });
//     }

//     connection.query('INSERT INTO authentication(first_name, last_name, birthday, email, password) VALUES(?,?,?,?,?)', [firstName, lastName, birthday, email, hashedPassword], (err, results) => {

//         if (err) {
//             console.log('Помилка при додаванні форми в базу даних')
//             res.status(500).json({
//                 message: 'Сталася помилка: можливо такий користувач вже існує!',
//                 error: err.message
//             })
//         } else {
//             res.status(200).json({
//                 message: 'данні з регістрації успішно добавлені в базу даних',
//                 data: firstName
//             })
//         }
//     })
// };

// // Вхід користувача на сайт
// exports.authLogin = (req, res) => {
//     const { email, password } = req.body;

//     connection.query('SELECT * FROM authentication WHERE email = ?', [email], async (err, results) => {
//         if (err || results.length === 0) {
//             return res.status(400).json({
//                 error: 'Такого користувача не існує!'
//             })
//         }
//         const user = results[0];
//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//             return res.status(401).json({ error: 'Невірний пароль!' })
//         } else {
//             console.log('login:', ' Вхід успішний в сесію!')
//             req.session.user = { id: user.id, email: user.email, firstName: user.first_name }; // Збереження інформації про користувача у сесії
//             res.json({
//                 message: 'Вхід успішний',
//                 user: { firstName: user.first_name }
//             })
//         }
//     })
// };

// //Отримання інформації про користувача
// exports.authUser = (req, res) => {
//     if (req.session.user) {
//         res.json(req.session.user)
//     } else {
//         res.json({ user: null })
//     }
// };

// // Виход із сесії
// exports.authLogout = (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.log('logout:', 'Помилка при завершенні сесії', err)
//             return res.status(500).json({ message: 'Помилка при завершенні сесії' })
//         }
//         console.log('logout:', ' Сесія успішно завершена')
//         res.clearCookie('connect.sid'); // Очищення cookie сесії
//         return res.status(200).json({ message: 'Сесія завершена' })
//     })
// };