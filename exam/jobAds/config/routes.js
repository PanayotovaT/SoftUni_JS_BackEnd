const homeController = require('../controllers/homeController');
const adController = require('../controllers/adController');

module.exports  = (app) => {
    app.use(homeController);
    app.use(adController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found'})
    })
}