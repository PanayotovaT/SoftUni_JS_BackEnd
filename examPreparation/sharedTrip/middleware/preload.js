//Replace with actual service
const tripService = require('../services/tripService');

async function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        //TODO change property name to match collection
        const trip = await tripService.getTripById(id);
        res.locals.trip =  trip;
        next()
    }
}

module.exports = preload;