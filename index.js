const PORT = 3000;
let express = require('express');
let app = express();

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login_page.html');
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT }`);
});