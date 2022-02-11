const express = require('express');
const expressSession =  require('express-session');

const users = {
    'sofi': {
        username: 'sofi',
        password:'123'
    }
}

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto'}
}))

app.get('/', (req, res) => {
    const user = req.session.user ||{
        username: 'anonymous',
    };
   console.log(req.session.user);
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const user = users[req.body.username];
    if(user && req.body.password==user.password){
        console.log('Sucecssfull Login');
        req.session.user = user;
    } else {
        res.status(401).send('Incorrect username or password!')
    }

    res.redirect('/')
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    const user = {
        username: req.body.username,
        password: req.body.password,
    }
    user[req.session.username] = user;
    console.log('Register successfull', req.session)
    res.redirect('/')
})

app.listen(3000);