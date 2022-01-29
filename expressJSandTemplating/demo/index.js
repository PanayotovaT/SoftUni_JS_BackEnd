const express = require('express');
const catalogController = require('./catalog');
const logger = require('./logger');
const auth = require('./auth');

const app = express();

app.use(logger);
app.use('/public', express.static('public'))
app.use('/catalog', catalogController);

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
});

app.get('/create', auth.isAdmin, (req, res) => {
    res.send('<form method "POST"><label>Name: <input name="name"></label><button>Send</button></form>')
});
app.get('/contact', (req, res) => [
    res.redirect('/about')
]);


app.all('*', (req, res) => {
    res.send('<h1>Resource not found</h1>')
});

app.listen(3000);