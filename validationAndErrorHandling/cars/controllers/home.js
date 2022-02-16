module.exports = {
   
    async home(req, res) {
        const cars = await req.storage.getAll(req.query);

        res.render('index', { cars, title: 'Car Catalog', query: req.query, errors: [{msg: 'Error1'}, {msg: 'Error2'}]});
    }
}