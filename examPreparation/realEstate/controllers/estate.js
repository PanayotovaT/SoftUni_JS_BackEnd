const { create, getOne, deleteEstate, edit, rentEstate } = require('../services/estateService');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', async (req, res) => {

    const estate = {
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        homeImg: req.body.homeImg,
        description: req.body.description,
        pieces: Number(req.body.pieces),
        owner: req.session.user._id,
    }

    try {
        await create(estate);
        res.redirect('/catalog');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: estate, errors });
    }
})

router.get('/edit/:id', async (req, res) => {

    const id = req.params.id;
    const data = await getOne(id);
    const isOwner = data.owner._id == req.session.user?._id;
    if (!isOwner) {
        throw new Error('You are not authorized to edit this record');
    }

    res.render('edit', { title: 'Edit Page', data });
});

router.post('/edit/:id', async (req, res) => {

    const id = req.params.id;
    const data = {
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        homeImg: req.body.homeImg,
        description: req.body.description,
        pieces: Number(req.body.pieces),
    }
    try {
        const existing = await getOne(id);
        console.log(existing.owner);
        const isOwner = existing.owner._id == req.session.user?._id;
        if (!isOwner) {
            throw new Error('You are not authorized to edit this record');
        }
        await edit(id, data);
        res.redirect(`/details/${id}`);
    } catch (err) {
        const errors = mapErrors(err);
        data._id = id;
        console.log(err);
        res.render('edit', { title: 'Edit Page', data, errors });
    }
});

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const estate = await getOne(id);
    const isOwner = estate.owner._id == req.session.user?._id;
    if (!isOwner) {
        throw new Error('You are not authorized to delete this record');
    }

    await deleteEstate(req.params.id);
    res.redirect('/catalog')
})

router.get('/rent/:id', async (req, res) => {
    const id = req.params.id;
    const userId = req.session.user._id;
    try {   
        await rentEstate(id, userId);
    } catch (err) {
        console.log(err);

    } finally {
        res.redirect('/details/' + id);
    }



});


module.exports = router;