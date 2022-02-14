module.exports = {
    async get(req, res) {
        res.render('create', { title: 'Create Listing' });
    },

    async post(req, res) {

        const car = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            imageUrl: req.body.imageUrl || undefined,
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