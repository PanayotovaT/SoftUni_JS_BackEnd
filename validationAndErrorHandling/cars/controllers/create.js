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
        try {
            await req.storage.createCar(car);
            res.redirect('/');
        } catch (errors) {
            console.log('Error createing!')
          if(errors.name == 'ValidationError') {
              errors = Object.values(errors.errors).map(e => ({msg: e.message}))
          }
            res.render('create', { title: 'Create Listing', errors});
        }
    }
}