const { redirect } = require("express/lib/response");

module.exports = {
    async get(req, res){
     const car = await req.storage.getOne(req.params.id);
       if(car) {
           res.render('delete', {title: 'Delete Item', ...car})
       } else {
           res.redirect('/404');
       }
    },
    async post(req,res){
        const id = req.params.id;
        try {
            await req.storage.deleteCar(id);
            res.redirect('/');
        }catch(err) {
            console.log(err);
        }
    }
}