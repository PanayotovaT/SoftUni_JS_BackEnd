const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models/index');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const deleteCar = require('./controllers/delete');
const edit = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');
const { loginGet, loginPost, registerGet, registerPost, logoutGet } = require('./controllers/auth');
const { isLoggedIn } = require('./services/util');

start();
async function start() {
    await initDb();

}
const app = express();


app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(session({
    secret: 'My super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.use(carsService());
app.use(accessoryService());
app.use(authService());

app.get('/', home);
app.get('/about', about);
app.get('/create', isLoggedIn(), create.get);
app.post('/create', isLoggedIn(), create.post);
app.get('/details/:id', details);
app.route('/delete/:id')
    .get(isLoggedIn(), deleteCar.get)
    .post(isLoggedIn(),deleteCar.post)
app.route('/edit/:id')
    .get(isLoggedIn(), edit.get)
    .post(isLoggedIn(), edit.post);
app.route('/accessory')
    .get(isLoggedIn(), accessory.get)
    .post(isLoggedIn(), accessory.post);

app.route('/attach/:id')
    .get(isLoggedIn(),attach.get)
    .post(isLoggedIn(), attach.post);
app.route('/login')
    .get(loginGet)
    .post(loginPost);
app.route('/register')
    .get(registerGet)
    .post(registerPost);
app.get('/logout', logoutGet);

app.all('*', notFound);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});









