const galleryService = require('../services/galleryService.js');

function preload () {
    return async (req, res, next) => {
      
        const publication = await galleryService.getPublication(req.params.id);
        res.locals.publication = publication;
        next();
    }
}

module.exports = preload;
    