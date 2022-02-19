const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const tripsController = require('../controllers/trip');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(tripsController);

    app.get('*', (req, res) => {
        res.render('404', {title: 'Not Found'})
    })
}