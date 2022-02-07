module.exports  = {
    async get(req, res){
        const id  = req.params.id;
        try {
            const [car, accessories ]=  await Promise.all([
                req.storage.getOne(id),
                req.accessory.getAll()
            
            ]);

            res.render('attach', {title: 'Attach accessory', car, accessories})
        } catch(err) {
            console.log(err);
            res.redirect('/404')
        }
    },
    async post(req, res){
        const carId = req.params.id;
        const accessoryId = req.body.accessory;
        try{
            await req.storage.attachAccessory(carId, accessoryId);
            res.redirect('/')
        }catch(err) {
            console.log(err);
            res.redirect('/attach/' + carId);
        }
    }
}