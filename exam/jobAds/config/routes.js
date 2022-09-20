const homeController = require('../controllers/homeController');

module.exports  = (app) => {
    app.use(homeController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found'})
    })
}