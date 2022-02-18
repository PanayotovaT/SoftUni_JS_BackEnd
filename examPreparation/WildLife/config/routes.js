const authController = require('../controllers/auth');
const homeConroller =  require('../controllers/home');
const postConroller =  require('../controllers/post');

module.exports = (app) => {
    app.use(homeConroller)
    app.use(authController);
    app.use(postConroller);
}