const express = require('express');
const catalogController = require('./catalog');

const app = express();

app.use(catalogController);

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});
app.post('/create', (req, res) => {
    res.status(201).send('Article created');
});


app.get('/about', (req, res) => {
    res.send('<h3>About page</h3>');
});

app.get('/getOrder', (req, res) => {
    res.download(__dirname + '/demo.pdf');
})

app.get('/contact', (req, res) => [
    res.redirect('/about')
])


app.all('*', (req, res) => {
    res.send('<h1>Resource not found</h1>')
})

app.listen(3000);