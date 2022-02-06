const multer = require('multer');

const UPLOADS_DIR = require('../constants/uploadsDir');

function defaultDestination(req, file, cb) {
  cb(null, UPLOADS_DIR);
}

function defaultFilename(req, file, cb) {
  const newFilename = `${new Date().getTime()}_${file.originalname}`;
  cb(null, newFilename);
}

const defaultAcceptedTypes = ['image/png', 'image/jpeg', 'video/mp4']; // Default accepted types for all files

module.exports = ({
  fileSize = 5,
  count = 'single',
  fieldName = 'file',
  destination,
  filename,
  acceptedTypes = defaultAcceptedTypes,
}) => {
  const storage = multer.diskStorage({
    destination: destination || defaultDestination,
    filename: filename || defaultFilename,
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 1048576 * fileSize, // 1 Byte * fileSize(mb)
    },
    fileFilter: (req, file, cb) => {
      if (acceptedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Filetype is not supported'));
      }
    },
  });

  return upload[count](fieldName);
};
