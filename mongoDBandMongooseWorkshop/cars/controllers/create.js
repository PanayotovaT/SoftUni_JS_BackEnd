module.exports = {
    async get(req, res) {
        res.render('create', { title: 'Create Listing' });
    },

    async post(req, res) {
        console.log(req.body);
        const car = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            imageUrl: req.body.imageUrl,
        }
        await req.storage.createCar(car);
        res.redirect('/');
    }
}