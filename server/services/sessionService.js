// Збереження - видалення інформації про користувача у сесії!
const SessionService = {
    setSession: (req, user) => {
        req.session.user = { id: user.id, email: user.email, firstName: user.first_name }
    },
    clearSession: (req, res) => {
        return new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if(err) {
                    reject(err)
                } else {
                    res.clearCookie('connect.sid')
                    resolve()
                }
            })
        })
    }
};

module.exports = SessionService
