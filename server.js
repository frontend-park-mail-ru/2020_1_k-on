const PORT = 3000;

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const app = express();

const root = path.resolve(__dirname, 'static');

app.use('/static', express.static('static'));
app.use(favicon(__dirname + '/static/img/favicon-play.ico'));

app.get('/', (req, res) => {
    res.sendFile(root + '/templates/index.html');
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

app.get('/profile', (req, res) => {
    res.sendFile(root + '/templates/profile_page.html');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${process.env.PORT || PORT}`);
});
