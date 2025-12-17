import express from 'express';
import user from './MOCK_DATA.json' with { type: 'json' };
import fs, { readFileSync } from 'fs'
import { CLIENT_RENEG_LIMIT } from 'tls';

const app = express()
app.use(express.json())

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
app.get('/user', async (req, res) => {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
});

app.post('/specificuser', async (req, res) => {
    const id = req.body._id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await response.json()
    res.json(data)
})

app.get('/', async (req, res) => {
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
    res.end(data)
})

app.post('/updateuser', async (req, res) => {
    const body = req.body;
    user.push({ ...body, date: new Date() })
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(user))
    res.send('success')
})

app.get('/updateuserqury', async (req, res) => {
    const first_name = req.query.first_name;
    console.log(first_name)
})

app.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    res.json(data);
});


app.listen(5000, () => {
    console.log('app is listening on port 5000')
})