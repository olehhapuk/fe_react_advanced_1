const express = require('express');

const articlesController = require('../controllers/articlesController');

const router = express.Router();

router.get('/', articlesController.getAll);
router.get('/:id', articlesController.getById);

module.exports = router;
