module.exports = {
    async get(req, res){
     const car = await req.storage.getOne(req.params.id);
       if(car) {
           res.render('edit', {title: 'Edit Item', ...car})
       } else {
           res.redirect('/404');
       }
    },
    async post(req,res){
        const id = req.params.id;
        console.log(req.body);
        const updatedCar = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            imageUrl: req.body.imageUrl
        }
        try {
            await req.storage.updateCar(id, updatedCar);
            res.redirect('/');
        }catch(err) {
            console.log(err);
        }
    }
}