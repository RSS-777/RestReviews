const sessionLogger = ((req, res, next) => {
    if (req.session && req.session.user) {
        console.log('sessionLogger:', 'Сесія активна:');
    } else {
        console.log('sessionLogger:', 'Сесія не активна');
    }
    next();
});

module.exports = sessionLogger;