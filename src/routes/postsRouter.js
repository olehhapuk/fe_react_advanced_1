const express = require('express');

const PostsController = require('../controllers/postsController');

const router = express.Router();
const postsController = new PostsController();

router.post('/', postsController.create);
router.get('/', postsController.getAll);

module.exports = router;
