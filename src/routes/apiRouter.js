const express = require('express');

const postsRouter = require('./postsRouter');
// const catsRouter = require('./catsRouter');

const router = express.Router();

router.use('/posts', postsRouter);
// router.use('/cats', catsRouter);

module.exports = router;
