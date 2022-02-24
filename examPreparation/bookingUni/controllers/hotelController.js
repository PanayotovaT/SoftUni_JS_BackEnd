const router = require('express').Router();
const mapErrors = require('../util/mappers');
const { create, deleteHotel } = require('../services/hotelService');
const preload = require('../middlewares/preload');
const { isOwner } = require('../middlewares/guards');

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', async (req, res) => {
    const data = {
        name: req.body.name.trim(),
        city: req.body.city.trim(),
        imgUrl: req.body.imgUrl.trim(),
        freeRooms: Number(req.body.freeRooms),
        owner: req.session.user._id
    }

    try {
        await create(data);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', errors, data })
    }
});

router.get('/edit/:id', preload(), isOwner(),  (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {

    await deleteHotel(req.params.id);
    res.redirect('/');
})

module.exports = router;
