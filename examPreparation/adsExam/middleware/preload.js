//Replace with actual service
const { getOne} = require('../services/adServices');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        res.locals.ad = await getOne(id);

        next()
    }
}

module.exports = preload;