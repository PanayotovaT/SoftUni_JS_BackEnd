const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.setHeader('Set-Cookie', 'theme=dark');
    res.send('Hello');
})

app.listen(3000);