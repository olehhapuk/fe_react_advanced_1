const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const uploadsDir = path.join(__dirname, '../uploads');
const avatarsDir = path.join(__dirname, '../../public/avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const newFilename = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFilename);
  },
});

const upload = multer({
  storage,
});

const router = express.Router();

/*
{
  avatar: string;
}
*/
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const newFilepath = path.join(avatarsDir, req.file.filename);
    await fs.rename(req.file.path, newFilepath);
    res.json(req.file.filename); // Avatar filename
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
