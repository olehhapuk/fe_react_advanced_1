const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { nanoid } = require('nanoid');

const createMessageHandlers = require('./handlers/messageHandlers');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

// Repository

let users = [];
let messages = [];

function createUser(socket, username) {
  return {
    id: socket.id,
    username,
  };
}

function findUserById(userId) {
  return users.find((user) => user.id === userId);
}

function createMessage(socket, text, targetUserId) {
  return {
    id: nanoid(),
    text,
    from: findUserById(socket.id),
    // to: findUserById(targetUserId)
  };
}

function insertUser(user) {
  users.push(user);
}

function insertMessage(message) {
  messages.push(message);
}

// ./Repository

function init(io, socket) {
  const newUser = createUser(socket, socket.handshake.auth.username);
  insertUser(newUser);

  socket.broadcast.emit('user connected', newUser);
  io.to(socket.id).emit('users list', users);
  io.to(socket.id).emit('messages list', messages);
}

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    users = users.filter((userId) => socket.id !== userId);
    io.emit('user disconnected', { userId: socket.id, users });
  });

  init(io, socket);

  const messageHandlers = createMessageHandlers(
    io,
    socket,
    createMessage,
    insertMessage,
    findUserById
  );

  socket.on('message create', messageHandlers.handleMessageCreate);
  socket.on('message typing', messageHandlers.handleMessageTyping);
});

server.listen(process.env.PORT, () => {
  console.log(`Started on http://localhost:${process.env.PORT}`);
});
