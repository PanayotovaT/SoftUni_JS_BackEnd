const router = require('express').Router();
const { search } = require('../services/estateService');
const mapErrors = require('../util/mappers');

router.get('/search', (req, res) => {
    
    res.render('search', {title: 'Search Page', searchResults: []});

})

router.post('/search', async (req, res) => {
    console.log(req.body.search);
    const searched = req.body.search.trim().toLowerCase();
    const searchedType = searched[0].toUpperCase() + searched.slice(1);

    try {
        if(searchedType != 'Villa' && searchedType != 'House' && searchedType != 'Apartment' ) {
            throw new Error('You may search only by type!');
        }
        const searchResults = await search(searchedType);
        res.render('search', {title: 'Search Page', searchedType, searchResults })

    } catch(err) {
        const errors = mapErrors(err);
        res.render('search', {title: 'Search Page', errors})

    }

})
module.exports = router;