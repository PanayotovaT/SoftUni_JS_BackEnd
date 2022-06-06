function isUser () {
    return function (req, res, next) {
        if(req.session.user) {
            next()
        } else {
            res.redirect('/login');
        }
    }
}

function isGuest () {

    return function (req, res, next) {
        console.log(Boolean(req.session.user));
        console.log(req.session.user);
        if(req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}


function isOwner() {
    return function (req, res, next) {
        const isOwner = req.params.id == req.session.user?._id;
        if (isOwner) {
            next();
        } else {
            res.redirect('/login')
        }

    }
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}