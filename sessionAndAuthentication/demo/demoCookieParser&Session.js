const express = require('express');
// const cookieParser = require('cookie-parser');
const expressSession =  require('express-session');

const app = express();

const sessions = {};



function mySession(req, res, next) {


    const cookies = (req.headers.cookie || '')
        .split(';')
        .map(t => t.trim())
        .map(t => t.split('='))
        .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    console.log('>>>', cookies);

   let user = sessions[cookies.sessionId];
    if (user == undefined) {
        const newId = '000000' + (Math.random() * 999999).toString(16).slice(-6);
        user = {
            visited: 1
        }
        sessions[newId] = user;
        res.setHeader('Set-Cookie', `sessionId=${newId}; httpOnly`);
    } else {
        user.visited++;
    }
    req.session = user;

next()
}

// app.use(mySession);
// app.use(cookieParser());
app.use(expressSession({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto'}
}))

app.get('/', (req, res) => {
    // console.log(req.cookies);
    // res.send(`<p>Hello</p><p>You have visisted this page ${req.session.visited} times.</p>`);
    // res.cookie('CookieParser_Cookie', 'hello')
    if(req.session.visited) {
        req.session.visited++;

    } else {
        req.session.visited = 1;
    }
    res.send(`<p>Hello</p><p>You have visisted this page ${req.session.visited} times.</p>`);
})

app.listen(3000);