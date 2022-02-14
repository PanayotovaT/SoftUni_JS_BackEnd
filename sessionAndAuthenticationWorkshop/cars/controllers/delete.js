module.exports = {
    async get(req, res) {
        const car = await req.storage.getOne(req.params.id);

        if (car.owner != req.session.user.id) {
            console.log('User is not owner!');
            return res.redirect('/login');
        }

        if (car) {
            res.render('delete', { title: 'Delete Item', ...car })
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;
        try {
            if (await req.storage.deleteCar(id, req.session.user.id)) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            };
        } catch (err) {
            console.log(err);
        }
    }
}