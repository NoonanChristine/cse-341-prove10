const path = require('path');
const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./server');

const app = express();
app.set('view engine', 'ejs');

//app will be using JSON
app.use(bodyParser.json())
app.use('/', router);

app.use(express.static('./public'));

app.get('/avengers-list', (req, res, next) => {
    res.render('./avengers-list', {
        title: 'Assignment 10', 
        path: 'avengers-list'
      })
});

app.listen(PORT);
