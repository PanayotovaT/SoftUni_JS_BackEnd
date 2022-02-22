const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use(homeController);

    app.get('*', (req, res) => {
        res.render('404', {title: 'Page Not Found'});
    })
}

