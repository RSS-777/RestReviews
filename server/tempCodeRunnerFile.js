require('dotenv').config()
const express = require('express');
const session = require('express-session')
const path = require('path');
const multer = require('multer');
const sessionLogger = require('./middlewares/sessionLogger');
const pagesRoutes = require('./routes/pagesRoutes');
const authenticationRoutes = require('./routes/authentificationRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const usersRoutes = require('./routes/usersRouter');
const upload = multer();

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
}));

//middleware
app.use(sessionLogger);

//pagesRoute
app.use('/', pagesRoutes);

//commentsRoute
app.use('/', commentsRoutes);

//authentificationRoute
app.use('/', authenticationRoutes);

//users (update, get all users)
app.use('/', usersRoutes);

app.listen(PORT, () => console.log(`Server work into port ${PORT}`));
