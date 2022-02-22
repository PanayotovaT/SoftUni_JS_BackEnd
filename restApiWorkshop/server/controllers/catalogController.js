const router = require('express').Router();
const furnitureService = require('../services/furniture');
const mapErrors = require('../util/mappers');
const {isAuth, isGuest, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
    console.log(req.user);
    const data = await furnitureService.getAll();
    res.json(data);

});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material,
        owner: req.user._id


    }

    try {
        const result = await furnitureService.create(item);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err).map(x => x.msg).join('\n');
        res.status(400).json({ message: error })
    }
});

router.get('/:id', preload(), (req, res) => {


    item = res.locals.item;
    res.json(item);

});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material,
    }
    try {
        const result = await furnitureService.update(req.params.id, item);
        res.json(result);
    } catch (err) {

        const error = mapErrors(err).map(x => x.msg).join('\n');
        res.status(400).json({ message: error })
    }

});

router.delete('/:id',preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    try {
        await furnitureService.deleteItem(itemId);
        res.status(204).end();
    } catch (err) {
        const error = mapErrors(err).map(x => x.msg).join('\n');
        res.status(400).json({ message: error })
    }
});

module.exports = router;