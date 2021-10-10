const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');

const contacts = require('./routes/contacts');

const app = express();

app.use(volleyball);
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello, World from a middleware');
//   next();
// });

// function validateCreate(req, res, next) {
//   try {
//       await createSchema.validate(req.body, { abortEarly: false });
//     } catch (error) {
//     }
// }

// volleyball -> cors -> custom middleware -> contacts
app.use('/api/contacts', contacts);
/*
  /api/contacts
    /hello - /api/contacts/hello
*/

/*
  CRUD operations - Create, Read, Update, Delete

  Get(Read) all resources = GET /resourceName (/users)
  Get(Read) one resource = GET /resourceName/:resourceId (/users/:userId)
  Create new resource = POST /resourceName (/users)
  Update resource = PUT*, PATCH /resourceName/:resourceId (/users/:userId)
  Delete resource = DELETE /resourceName/:resourceId (/users/:userId)
*/

// GET - /api/contacts -> Hello, World from /contacts
// app.get('/api/contacts', (req, res) => {
//   res.send('Hello, World from /contacts');
// });

// /api/contacts/123012388 - Request url example
// GET - /api/contacts/:contactId -> /contacts ID = id
// app.get('/api/contacts/:contactId', (req, res) => {
//   res.send(`/contacts ID = ${req.params.contactId}`);
// });

module.exports = app;
