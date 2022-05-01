const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

let users = [];

io.on('connection', (socket) => {
  users.push(socket.id);

  io.emit('user connected', { userId: socket.id, users });

  socket.on('disconnect', () => {
    users = users.filter((userId) => socket.id !== userId);
    io.emit('user disconnected', { userId: socket.id, users });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Started on http://localhost:${process.env.PORT}`);
});
