function isUser() {
    return (req, res, next) => {

        if(req.session.user) {
            next();
        } else{
            res.redirect('/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if(!req.session.user) {
            next();
        } else {
            res.redirect('/')
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        if(res.locals.hotel.owner == req.session.user?._id) {
            next()
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}