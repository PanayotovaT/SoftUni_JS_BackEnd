const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const estateController = require('../controllers/estate');


module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(estateController);

    app.get('*', (req, res) => {
        res.render('404', {title: 'Page Not Found'})
    })
}

