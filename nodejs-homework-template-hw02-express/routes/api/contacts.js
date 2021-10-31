const express = require('express');
const router = express.Router();
const validate = require('../api/validation.js');
const Contact = require('../../model/Contact');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    // const newContact = new Contact({
    //   ...req.body,
    // });
    // newContact.favorite = false;
    // newContact.save();

    const contact = await Contact.create(req.body);

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (contact) {
      await Contact.findByIdAndDelete(contactId);

      return res.json({
        status: 'success',
        code: 200,
        data: {
          message: 'Contact deleted',
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (contact) {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        {
          new: true,
        }
      );

      return res.json({
        status: 'success',
        code: 200,
        data: {
          updatedContact,
        },
      });
    } else {
      return res.json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (
      req.body.favorite === undefined ||
      typeof req.body.favorite !== 'boolean'
    ) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    if (contact) {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        {
          favorite: req.body.favorite,
        },
        {
          new: true,
        }
      );

      return res.json({
        status: 'success',
        code: 200,
        data: {
          updatedContact,
        },
      });
    } else {
      return res.json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
