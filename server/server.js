require('dotenv').config()
const express = require('express');
const session = require('express-session')
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(upload.none());

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..', 'css')));
app.use(express.static(path.join(__dirname, '..', 'css', 'blocks')));
app.use(express.static(path.join(__dirname, '..', 'css', 'pages')));
app.use(express.static(path.join(__dirname, '..', 'images')));
app.use(express.static(path.join(__dirname, '..', 'js')));
app.use(express.static(path.join(__dirname, '..', 'pages')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use((req, res, next) => {
    if (req.session) {
        console.log('Сесія активна:');
    } else {
        console.log('Сесія не активна');
    }
    next();
});

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

connection.query('SELECT * FROM comment_post', (err, results) => {
    if (err) console.log(err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'contact.html'))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'about.html'))
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages/registration.html'))
});

//отримати коментарі і розмістити їх на сторінці
app.get('/api/comments', (req, res) => {
    connection.query('SELECT * FROM comment_post', (err, results) => {
        if (err) {
            console.error(err)
        } else {
            res.json(results)
        }
    })
});

// Добавити коментар до бази даних
app.post('/', (req, res) => {
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

//Регістрація
app.post('/registration', async (req, res) => {
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
})

//Логін
app.post('/login', (req, res) => {
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
            req.session.user = {id: user.id, email: user.email, firstName: user.first_name}; // Збереження інформації про користувача у сесії
            res.json({ 
                message: 'Вхід успішний',
                user: {firstName: user.first_name}
            })
        }
    })
})

// Обробник для отримання інформації про користувача
app.get('/api/user', (req, res) => {
    if(req.session.user) {
        res.json(req.session.user)
    } else {
        res.json({user: null})
    }
})

// Виход із сесії
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
          return res.status(500).json({message: 'Помилка при завершенні сесії'})  
        }
        res.clearCookie('connect.sid'); // Очищення cookie сесії
        return res.status(200).json({message: 'Сесія завершена'})
    })

})

app.listen(PORT, () => console.log(`Server work into port ${PORT}`))