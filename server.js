const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}))
app.use(express.json()); //this middleware will parse out JSON coming in, so has to go before the api routes

app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
);