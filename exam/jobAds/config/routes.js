const homeController = require('../controllers/homeController');
const adController = require('../controllers/adController');
const authController =require('../controllers/authController');

module.exports  = (app) => {
    app.use(homeController);
    app.use(adController);
    app.use(authController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found'})
    })
}