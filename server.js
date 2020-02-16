const PORT = 3000;

const path = require('path');
const express = require('express');

const app = express();

const root = path.resolve(__dirname, 'static')

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.sendFile(root + '/templates/login_page.html');
});

app.get('/movie', (req, res) => {
    res.sendFile(root + '/templates/movie_page.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(root + '/templates/signup_page.html');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${process.env.PORT || PORT}`);
});
