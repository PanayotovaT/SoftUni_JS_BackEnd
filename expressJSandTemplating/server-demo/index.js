const app = require('express')();
const hbs = require('express-handlebars');


hbs.create({
    extname: '.hbs'
});

app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');


app.get('/', (req, res) => {
    res.send('Hello!');
})
app.listen(3000);