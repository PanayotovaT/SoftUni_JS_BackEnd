function userSession() {
    return  (req, res, next) => {
        console.log(req.session.user);
        if(req.session.user) {
            res.locals.user = req.session.user;
            res.locals.hasUser = true;
        }
console.log('User Session')
        next();
    }
}

module.exports = userSession;