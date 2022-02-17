const authController = require('../controllers/auth');
const homeConroller =  require('../controllers/home');

module.exports = (app) => {
    app.use(homeConroller)
    app.use(authController);
}