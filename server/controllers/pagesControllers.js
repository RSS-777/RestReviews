const path = require('path');

exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'pages', 'index.html'))
};

exports.renderContactPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'pages', 'contact.html'))
};

exports.renderAboutPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..','pages', 'about.html'))
};

exports.renderRegistrationPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'pages/registration.html'))
}