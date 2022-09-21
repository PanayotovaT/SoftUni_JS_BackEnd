function isUser() {
    return function (req, res, next) {
        if(req.session.user) {
            next();
        } else {
            res.redirect('/login')
        }
    }
}

function isGuest() {
    return function (req, res, next) {
        if(!req.session.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

function isOwner() {
    return function (req, res, next) {
        const userId = req.session.user?._id;
        const authorId = res.locals.ad.author._id;
        if(userId == authorId) {
            next();
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