//Replace with actual service
const tutorialService = require('../services/tutorialService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;

        res.locals.tutorial = await tutorialService.getOne(id);


        next()
    }
}

module.exports = preload;