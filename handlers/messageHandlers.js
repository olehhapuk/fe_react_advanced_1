module.exports = (io, socket, createMessage, insertMessage, findUserById) => {
  return {
    handleMessageCreate: (text, userId, callback) => {
      const newMessage = createMessage(socket, text);
      insertMessage(newMessage);

      if (userId) {
        io.to([userId, socket.id]).emit('message create', newMessage);
      } else {
        io.emit('message create', newMessage);
      }

      callback('OK');
    },
    handleMessageTyping: () => {
      io.emit('message typing', findUserById(socket.id));
    },
  };
};
