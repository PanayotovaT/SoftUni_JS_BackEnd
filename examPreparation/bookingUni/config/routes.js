const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const hotelController = require('../controllers/hotelController');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(hotelController);

}