const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    next()
})

app.use(express.json());

const data = [
    {
        id: 'asfdg001',
        name: 'First',
        color: 'blue'
    },
    {
        id: 'asfdg002',
        name: 'Second',
        color: 'green'
    },
    {
        id: 'asfdg003',
        name: 'Third',
        color: 'red'
    },
    {
        id: 'asfdg004',
        name: 'Fourth',
        color: 'yellow'
    },
];

app.get('/', (req, res) => {
    // res.send('Hello');
    res.json({ message: 'Hello' })
})

app.get('/api/catalog', (req, res) => {
    res.json(data);
});

app.post('/api/catalog', (req, res) => {
    const id = 'asdf' + (Math.random()* 9999 | 0);
    req.body.id = id;
    data.push(req.body);

    res.json(req.body);
});

app.get('/api/catalog/:id', (req, res) => {
    const id  = req.params.id;
    const record = data.find(x => x.id == id);
    res.json(record);
});

app.put('/api/catalog/:id', (req, res) => {
    console.log(req.body);
    const id  = req.params.id;
    let index;
    for(let i = 0; i < data.length; i++ ){
        if(data[i].id == id) {
            index = i;
            break;
        }
    }
    req.body.id = id;
    data[index] =  req.body;

    res.json(data[index]);
});

app.delete('/api/catalog/:id', (req, res) => {
    const id  = req.params.id;
    let index;
    for(let i = 0; i < data.length; i++ ){
        if(data[i].id == id) {
            index = i;
            break;
        }
    }
    data.splice(index, 1);
    res.status(204).end();
});



app.listen(3000, () => console.log('Server listening on port 3000'));