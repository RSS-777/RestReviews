const UserModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    UserModel.getAllUsers((err, result) => {
        if (err) {
            console.log('Помилка при отриманні всіх користувачів')
            return res.status(500).json({
                error: `Помилка при отриманні всіх користувачів`,
                message: err.message
            })
        } else {
            console.log('Данні успішно отримані')
            res.status(200).json({
                message: 'Данні успішно отримані',
                data: result
            })
        }
    })
};

exports.updateUserRole = (req, res) => {
    const { userId, newRoleId } = req.body;
    console.log('req:', req.session.user);

    UserModel.updateUserRole(userId, newRoleId, (err, result) => {
        if (err) {
            console.log('Помилка при оновленні ролі для користувача')
            return res.status(400).json({
                error: 'Помилка при оновленні ролі для користувача',
                message: err.message
            })
        } else {
            console.log('Роль користувача в базі успішно оновлено');
            return res.status(200).json({ message: 'Роль користувача в базі успішно оновлено', data: newRoleId});
        }
    })
};