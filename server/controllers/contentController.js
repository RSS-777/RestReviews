const ContentModel = require('../models/contentModel')

exports.getPageHome = ((req, res) => {

    ContentModel.getPageHome((err, result) => {
        if (err) {
            console.log('Помилка при отриманні сторінки з бази данних');
            return res.status(500).json({
                message: 'Помилка при отриманні сторінки з бази данних.',
                error: err
            })
        } else {
            console.log('Сторінка успішно отримана з бази данних');
            return res.status(200).json({
                message: 'Сторінка успішно отримана з бази данних',
                data: result
            })
        }
    })
});

exports.getPageAbout = ((req, res) => {
    ContentModel.getPageAbout((err, result) => {
        if (err) {
            console.log('Помилка при отриманні сторінки з бази данних');
            return res.status(500).json({
                message: 'Помилка при отриманні сторінки з бази данних.',
                error: err
            })
        } else {
            console.log('Сторінка успішно отримана з бази данних');
            return res.status(200).json({
                message: 'Сторінка успішно отримана з бази данних',
                data: result
            })
        }
    })
});

exports.getPageContact = ((req, res) => {
    ContentModel.getPageContact((err, result) => {
        if (err) {
            console.log('Помилка при отриманні сторінки з бази данних');
            return res.status(500).json({
                message: 'Помилка при отриманні сторінки з бази данних.',
                error: err
            })
        } else {
            console.log('Сторінка успішно отримана з бази данних');
            return res.status(200).json({
                message: 'Сторінка успішно отримана з бази данних',
                data: result
            })
        }
    })
});

exports.postPageAbout = ((req, res) => {
    const { title, text } = req.body;

    ContentModel.postPageAbout(title, text, (err, result) => {
        if (err) {
            console.log('Не вдалося обновити дані на сервері, сторінки About, Причина:', err)
            res.status(500).json({
                message: 'Не вдалося обновити дані на сервері, сторінки About',
                error: err
            })
        } else {
            console.log('Дані успішно оновленні на сервері сторінки About')
            res.status(200).json({
                message: 'Дані успішно оновленні на сервері сторінки About'
            })
        }
    })
});

exports.postPageContact = ((req, res) => {
    const { addressCity, addressCountry, addressRegion, addressStreet, email, tell, title, viber } = req.body
    ContentModel.postPageContact(addressCity, addressCountry, addressRegion, addressStreet, email, tell, title, viber, (err, result) => {
        if (err) {
            console.log('Не вдалося обновити дані на сервері, сторінки Contact, Причина:', err)
            res.status(500).json({
                message: 'Не вдалося обновити дані на сервері, сторінки Contact',
                error: err
            })
        } else {
            console.log('Дані успішно оновленні на сервері сторінки Contact')
            res.status(200).json({
                message: 'Дані успішно оновленні на сервері сторінки Contact'
            })
        }
    })
});

exports.postPageHome = ((req, res) => {
    const { dataArray, title } = req.body
    ContentModel.postPageHome(dataArray, title, (err, result) => {
        if (err) {
            console.log('Помилка при оновленні даних сторінки Home на сервері:', err)
            res.status(500).json({
                message: 'Помилка при оновленні даних сторінки Home на сервері:',
                error: err
            })
        } else {
            console.log('Дані успішно оновленні на сервері сторінки Home')
            res.status(200).json({
                message: 'Дані успішно оновленні на сервері сторінки Home'
            })
        }
    })
});

exports.postChangeBlock = ((req, res) => {
    const { idBlock = null, methodChange, url = null, alt = null } = req.body
    console.log(idBlock, methodChange, url, alt)

    ContentModel.postChangeBlock(idBlock, methodChange, url, alt, (err, result) => {
        if (methodChange === 'add') {
            if (err) {
                console.log('Помилка при добавленні нового блоку в таблицю Block')
                res.status(500).json({
                    message: 'Помилка при добавленні нового блоку в таблицю Block',
                    error: err
                })
            } else {
                console.log('Додано новий блок до таблиці Block успішно')
                res.status(200).json({
                    message: 'Додано новий блок до таблиці Block успішно'
                })
            }
        }
        if (methodChange === 'del') {
            if (err) {
                console.log('Помилка при видаленні блоку з таблицю Block')
                res.status(500).json({
                    message: 'Помилка при видаленні блоку з таблицю Block',
                    error: err
                })
            } else {
                console.log('Видаленно блок з таблиці Block успішно')
                res.status(200).json({
                    message: 'Видаленно блок з таблиці Block успішно',
                })
            }
        }
    })
});
