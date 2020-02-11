var express = require('express');
var app = express();

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/login_page.html');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});