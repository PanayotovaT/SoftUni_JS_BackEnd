function isUser () {
    return (req, res, next) => {
        if(req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

function isGuest () {
    return( req, res, next) => {
        if(!req.session.user) {
            next();
        } else {
            res.redirect('/')
        }
    }
}

module.exports = {
    isUser,
    isGuest
}