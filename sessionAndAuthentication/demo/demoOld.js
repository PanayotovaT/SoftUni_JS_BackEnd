const express = require('express');

const app = express();

const sessions = {};



function mySession(req, res, next) {
    /* if(req.headers.cookie) {
        console.log('>>>', req.headers.cookie);
        visited =Number(req.headers.cookie.split('=')[1]);
        visited++;
    }
    res.setHeader('Set-Cookie', `visited=${visited}; httpOnly`);
    */
    //  res.setHeader('Set-Cookie', `visited=${visited}; httpOnly`);


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

app.use(mySession)
app.get('/', (req, res) => {

    res.send(`<p>Hello</p><p>You have visisted this page ${req.session.visited} times.</p>`);
})

app.listen(3000);