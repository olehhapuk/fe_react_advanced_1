const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const imagesDir = path.join(__dirname, '../../images');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const newFilename = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFilename);
  },
});

const acceptedTypes = ['image/png', 'image/jpeg'];
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (acceptedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Filetype is not supported'));
    }
  },
});

router.post('/', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  res.json(req.file.path);
});

module.exports = router;
