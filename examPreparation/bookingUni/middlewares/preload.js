const { getOne } = require("../services/hotelService")

function preload() {
    return async (req, res, next) => {
    
        const hotel = await getOne(req.params.id);
        res.locals.hotel = hotel;

        next()
    }
}

module.exports = preload;