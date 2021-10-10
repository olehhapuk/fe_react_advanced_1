const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');
const yup = require('yup');

const router = express.Router();
const contactsPath = path.resolve(__dirname, '../../db/contacts.json');

// GET - /api/contacts/hello -> Hello, World
// router.get('/hello', (req, res) => {
//   res.send('Hello, World');
// });

function schemaValidate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error);
      res.status(422).json(error);
    }
  };
}

// GET - /api/contacts
router.get('/', async (req, res) => {
  try {
    let contacts = await fs.readFile(contactsPath);
    contacts = JSON.parse(contacts);

    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET - /api/contacts/:contactId
router.get('/:contactId', async (req, res) => {
  try {
    let contacts = await fs.readFile(contactsPath);
    contacts = JSON.parse(contacts);

    const targetContact = contacts.find(
      (contact) => contact.id === req.params.contactId
    );
    if (!targetContact) {
      res.status(404).json({
        message: 'Not Found',
      });
      return;
    }

    res.json(targetContact);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

const createSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).required(),
});

// POST - /api/contacts
router.post('/', schemaValidate(createSchema), async (req, res) => {
  try {
    let contacts = await fs.readFile(contactsPath);
    contacts = JSON.parse(contacts);

    const newUser = {
      id: nanoid(),
      ...req.body,
    };

    contacts.push(newUser);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// DELETE - /api/contacts/:contactId
router.delete('/:contactId');

// PUT - /api/contacts/:contactId
router.put('/:contactId', schemaValidate(createSchema), async (req, res) => {});

module.exports = router;
