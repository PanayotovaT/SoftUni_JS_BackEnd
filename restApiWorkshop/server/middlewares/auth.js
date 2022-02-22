const { verifySession } = require("../services/userService");
const mapErrors = require("../util/mappers");

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = verifySession(token);
            req.user = userData;
        }
        next();

    } catch (err) {
        res.status(498).json({ message: 'Invalid acces token. Please sign in!' })
    }
}