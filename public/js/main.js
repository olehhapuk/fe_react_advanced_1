const registerFormRef = document.querySelector('.register-form');
const usernameInputRef = document.querySelector('#authUsername');
const usersListRef = document.querySelector('.users-list');

const messageFormRef = document.querySelector('.message-form');
const messageInputRef = document.querySelector('#message');
const messagesListRef = document.querySelector('.messages-list');

const messageTypingRef = document.querySelector('#typingText');

registerFormRef.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInputRef.value;
  connect(username);
  registerFormRef.remove();
});

function createUserHTML(user) {
  return `<button
            class="list-group-item list-group-item-action"
            data-userid="${user.id}"
          >
            ${user.username}
          </button>`;
}

function createMessageHTML(message, socket) {
  /**
   * {
   *   id: String,
   *   text: String,
   *   from: User,
   * }
   */
  const isMine = message.from.id === socket.id;
  return `<li class="${
    isMine ? 'list-group-item active' : 'list-group-item'
  }" data-messageid="${message.id}">
            <h4>${message.from.username}</h4>
            <p>${message.text}</p>
          </li>`;
}

function connect(username) {
  const socket = io({
    auth: {
      username,
    },
  });

  messageFormRef.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMessageText = messageInputRef.value;
    socket.emit('message create', newMessageText, (status) => {
      console.log(status);
      if (status === 'OK') {
        messageInputRef.value = '';
      }
    });
  });

  messageInputRef.addEventListener('input', () => {
    socket.emit('message typing');
  });

  socket.on('user connected', (newUser) => {
    console.log(newUser);
    const newUserHTML = createUserHTML(newUser);
    usersListRef.insertAdjacentHTML('beforeend', newUserHTML);
  });

  socket.on('users list', (users) => {
    console.log(users);
    for (const user of users) {
      const newUserHTML = createUserHTML(user);
      usersListRef.insertAdjacentHTML('beforeend', newUserHTML);
    }
  });

  socket.on('messages list', (messages) => {
    console.log(messages);
    for (const message of messages) {
      const newMessageHTML = createMessageHTML(message, socket);
      messagesListRef.insertAdjacentHTML('afterbegin', newMessageHTML);
    }
  });

  socket.on('message create', (newMessage) => {
    const newMessageHTML = createMessageHTML(newMessage, socket);
    messagesListRef.insertAdjacentHTML('afterbegin', newMessageHTML);
  });

  let typingTimeoutID = null;

  socket.on('message typing', (user) => {
    console.log(`${user.username} is typing`);
    messageTypingRef.textContent = `${user.username} is typing`;

    if (typingTimeoutID) {
      clearTimeout(typingTimeoutID);
    }

    typingTimeoutID = setTimeout(() => {
      messageTypingRef.textContent = '';
    }, 500);
  });
}
