module.exports = {
    async get(req, res) {
        res.render('create', { title: 'Create Listing' });
    },

    async post(req, res) {

        const car = {
            name: req.body.name.trim(),
            description: req.body.description.trim(),
            price: Number(req.body.price.trim()),
            imageUrl: req.body.imageUrl.trim() || undefined,
            owner: req.session.user.id
        }
        try{
        await req.storage.createCar(car);
        res.redirect('/');
        } catch(err) {
            console.log('Error createing!')
            res.redirect('/create');
        }
    }
}