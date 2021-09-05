const fs = require('fs').promises;

function listUsers() {
  fs.readFile('./data.json').then((res) => console.log(JSON.parse(res)));
}

function getUser(id) {
  fs.readFile('./data.json').then((res) => {
    const users = JSON.parse(res);
    const result = users.find((user) => user.id === id);
    if (!result) {
      console.log('This user does not exist');
    } else {
      console.log(result);
    }
  });
}

function createUser(username, password) {
  fs.readFile('./data.json').then((res) => {
    const contacts = JSON.parse(res);
    const newUser = {
      id: contacts.length + 1,
      username: username,
      password: password,
    };

    contacts.push(newUser);

    fs.writeFile('./data.json', JSON.stringify(contacts));
  });
}

function deleteUser(id) {
  fs.readFile('./data.json').then((res) => {
    const users = JSON.parse(res);
    const result = users.filter((user) => user.id !== id);
    fs.writeFile('./data.json', JSON.stringify(result));
  });
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  deleteUser,
};
