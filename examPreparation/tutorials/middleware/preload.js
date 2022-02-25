//Replace with actual service
const tutorialService = require('../services/tutorialService');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;

        res.locals.tutorial = await tripService.getOne(id);


        next()
    }
}

module.exports = preload;