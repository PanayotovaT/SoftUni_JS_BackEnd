const router =  require('express').Router();
const mapErrors = require('../util/mappers');
const { create } = require('../services/hotelService');

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create Page'});
});

router.post('/create', (req, res) => {
    const hotel = {
       name: req.body.name.trim(),
       city: req.body.city.trim(),
       imgUrl: req.body.imgUrl.trim(),
        freeRooms: Number(req.body.freeRooms)
        }

    try{
        await 
        res.redirect('/');
    } catch(err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Page', errors, data: hotel})
    }
});

router.get('/edit/:id', (req, res) => {
    res.render('edit', {title: 'Edit Page'});
});

router.get('/delete/:id', (req, res) => {

    res.redirect('/');
})

module.exports = router;
