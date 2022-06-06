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
 
        if(req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}


function isOwner() {
    return function (req, res, next) {
        const isOwner = res.locals.publication.author._id == req.session.user?._id;
        console.log(isOwner, 'isOwner')
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