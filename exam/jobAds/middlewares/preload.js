const { getById }  = require('../services/adServices');

function preload() {
    return async (req, res, next) => {
        const id = req.params.id;
        res.locals.ad = await getById(id);
        next()
    }   
}

module.exports = preload;