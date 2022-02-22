const { getOne } = require("../services/furniture");

module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await getOne(id).lean();
        item._ownerId = item.owner;
        res.locals.item = item;
        next();
    } catch (err) {

        res.status(404).json({ message: 'Record not found!' })
    }
}