const { redirect } = require("express/lib/response");

module.exports = {
    async get(req, res){
     const car = await req.storage.getOne(req.params.id);
    
     if(car.owner != req.session.user.id) {
         console.log('User is not owner!');
         return res.redirect('/login');
     }
     if(car) {
           res.render('edit', {title: 'Edit Item', ...car})
       } else {
           res.redirect('/404');
       }
    },
    async post(req,res){
        const id = req.params.id;
        const updatedCar = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            imageUrl: req.body.imageUrl
        }
        try {
            if (await req.storage.updateCar(id, updatedCar, req.session.user.id)) {
                res.redirect('/');
                
            } else {
                redirect('/login')
            };
        }catch(err) {
            console.log('The error is: ' + err.message);
            res.redirect(`/edit/${id}`); 
        }
    }
}