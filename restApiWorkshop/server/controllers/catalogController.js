const router  = require('express').Router();
const furnitureService = require('../services/furniture');
const { mapErrors } = require('../util/mappers');

router.get('/', async (req, res) => {

    const data = await furnitureService.getAll();
    res.json(data);
    
});

router.post('/', async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material

    }

    try{
        const result  = await furnitureService.create(item);
        res.status(201).json(result);
    } catch(err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({message: error})
    }
    console.log('CREATE Catalog');
    console.log(req.body);
    res.end();
});

router.get('/:id', (req, res) => {
    console.log('READ Record');
    res.end();
});

router.put('/:id', (req, res) => {
    console.log('UPDATE Record');
    res.end();
});

router.delete('/:id', (req, res) => {
    console.log('DELETE Record');
    res.end();
});

module.exports = router;