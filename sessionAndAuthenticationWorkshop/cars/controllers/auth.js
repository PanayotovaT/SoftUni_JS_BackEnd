module.exports = {
    registerGet(req, res){
        res.render('register', { title: 'Register Page'})
    },
    registerPost(req, res){

    },
    loginGet(req, res){
        res.render('login', { title: 'Login Page'})

    },
    loginPost(req, res){

    },
    logoutGet(req, res){
        res.redirect('/');
    },
}