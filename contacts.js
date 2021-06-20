const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve(__dirname, 'db/contacts.json');

// let id = 10;

function listContacts() {
  fs.readFile(contactsPath).then((response) => {
    const contacts = JSON.parse(response);
    console.log(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath).then((response) => {
    const contacts = JSON.parse(response);
    const targetContact = contacts.find((contact) => contact.id === contactId);
    console.log(targetContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath).then((response) => {
    const contacts = JSON.parse(response);

    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newContacts));
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath).then((response) => {
    const contacts = JSON.parse(response);

    contacts.push({
      // id,
      id: contacts.length + 1,
      name,
      email,
      phone,
    });

    // id++;

    fs.writeFile(contactsPath, JSON.stringify(contacts));
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
