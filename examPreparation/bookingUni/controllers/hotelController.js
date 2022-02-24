const router = require('express').Router();
const mapErrors = require('../util/mappers');
const { create, deleteHotel, update } = require('../services/hotelService');
const preload = require('../middlewares/preload');
const { isOwner, isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(),async (req, res) => {
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

router.get('/edit/:id',isUser(), preload(), isOwner(),  (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id',isUser(), preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const hotel = {
        name: req.body.name.trim(),
        city: req.body.city.trim(),
        freeRooms: Number(req.body.freeRooms),
        imgUrl: req.body.imgUrl.trim()
    }

    try{
        await update(req.params.id, hotel);
        res.redirect('/details/' + id)
    } catch(err) {
        console.log(err);
        const errors = mapErrors(err);
        hotel._id = id;
        res.render('edit', { title: 'Edit Page', errors, hotel});
    }
})

router.get('/delete/:id', isUser(), preload(), isOwner(), async (req, res) => {

    await deleteHotel(req.params.id);
    res.redirect('/');
})

module.exports = router;
