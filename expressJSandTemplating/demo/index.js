const express = require('express');

const app = express();

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});
app.post('/create', (req, res) => {
    res.status(201).send('Article created');
});

app.get('/catalog/', (req, res) => {
    res.send('Catalog');
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

app.get('/catalog/:productId', (req, res) => {
    res.send('Product Page');
    console.log(req.params);

});

app.all('*', (req, res) => {
    res.send('<h1>Resource not found</h1>')
})

app.listen(3000);