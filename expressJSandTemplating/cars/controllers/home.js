module.exports = {
   
    async home(req, res) {
        console.log(req.query);
        const cars = await req.storage.getAll(req.query);
        
        res.render('index', { cars, title: 'Car Catalog' });
    }
}