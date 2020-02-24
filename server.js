const PORT = 3000;

const path = require('path');
const express = require('express');

const app = express();

const root = path.resolve(__dirname, 'static');

app.use('/static', express.static('static'));
app.use('/dist', express.static('dist'));

app.get('/favicon.ico', (req, res) => {
    res.sendFile(root + '/img/favicon-play.ico');
});

app.get('/', (req, res) => {
    res.sendFile(root + '/index.html');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${process.env.PORT || PORT}`);
});
