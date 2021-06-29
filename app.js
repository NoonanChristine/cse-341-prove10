const path = require('path');
const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./server');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');

io.on("connection", socket => {
  console.log('client connected')
  socket.on("new-name", () => {
    socket.broadcast.emit('update-list')
  });
})

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

server.listen(PORT);
