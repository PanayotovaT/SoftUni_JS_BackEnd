const express = require('express');

const app = express();

let visited = 0;
let id;

app.get('/', (req, res) => {
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

        if (cookies.sessionId == undefined) {
            const nextId = '000000' + (Math.random() * 999999).toString(16).slice(-6);
            id = nextId;
            res.setHeader('Set-Cookie', `sessionId=${nextId}; httpOnly`);
            visited = 1;
        } else if(cookies.sessionId == id) {
            visited++;
        }
    

    res.send(`<p>Hello</p><p>You have visisted this page ${visited} times.</p>`);
})

app.listen(3000);