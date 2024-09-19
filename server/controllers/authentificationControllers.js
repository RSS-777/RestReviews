const PasswordService = require('../services/passwordService');
const SessionService = require('../services/sessionService');
const UserModel = require('../models/userModel');
const path = require('path')

// Реєстрація
exports.authRegistration = async (req, res) => {
    const { firstName, lastName, email, password, birthday } = req.body
    const hashedPassword = await PasswordService.hashPassword(password);

    if (!firstName || !lastName || !birthday || !email || !hashedPassword) {
        return res.status(400).json({
            message: 'Будь ласка, заповніть всі поля.',
            error: 'status(400)'
        });
    }

    UserModel.create(firstName, lastName, birthday, email, hashedPassword, (err, results) => {

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

    UserModel.findEmailUser(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Внутрішня помилка сервера', message: err.message })
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'Такого користувача не існує!', message: 'Будь ласка, перевірте електронну адресу' })
        }
        const user = results[0];
        const validPassword = await PasswordService.comparePassword(password, user.password);

        if (!validPassword) { return res.status(401).json({ error: 'Невірний пароль!' }) }

        console.log('login:', ' Вхід успішний в сесію!')
        SessionService.setSession(req, user);
        res.json({
            message: 'Вхід успішний',
            user: { firstName: user.first_name }
        })
    })
};

//Отримання інформації про користувача з сессії
exports.authUser = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json({ user: null })
    }
};

// Виход із сесії
exports.authLogout = async (req, res) => {
    try {
        await SessionService.clearSession(req, res)
        console.log('logout:', ' Сесія успішно завершена')
        return res.status(200).json({ message: 'Сесія завершена'})
    } catch (err) {
        console.log('logout:', 'Помилка при завершенні сесії', err)
        return res.status(500).json({ message: 'Помилка при завершенні сесії' })
    }
};

//Доступ до адмін-панелі

exports.adminPanel = async (req, res) => {
    if (req.session.user && (req.session.user.roleId === 3 || req.session.user.roleId === 2)) {
        res.sendFile(path.join(__dirname, '..', '..', 'pages', 'admin.html'))
    } else {
        res.status(403).json({ message: 'Доступ заборонений' })
    }
}
