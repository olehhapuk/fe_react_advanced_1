const multerBuilder = require('./multerBuilder');
const UPLOADS_DIR = require('../constants/uploadsDir');

module.exports = multerBuilder({
  fileSize: 3,
  fieldName: 'avatar',
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
});
