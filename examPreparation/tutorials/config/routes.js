const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const tutorialController = require('../controllers/tutorialController');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(tutorialController);

}