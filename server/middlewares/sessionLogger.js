const sessionLogger = ((req, res, next) => {
    if (req.session) {
        console.log('Сесія активна:');
    } else {
        console.log('Сесія не активна');
    }
    next();
});

module.exports = sessionLogger;