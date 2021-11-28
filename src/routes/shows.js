const express = require('express');

const { schemaValidate, auth } = require('../middlewares');
const { showValidators } = require('../validationSchemas');
const { showsController } = require('../controllers');

const router = express.Router();

router.get('/', auth, showsController.getAll);
router.post(
  '/',
  auth,
  schemaValidate(showValidators.create),
  showsController.create
);
router.put(
  '/:showId',
  schemaValidate(showValidators.update),
  showsController.update
);
router.get('/:showId', showsController.getById);
router.delete('/:showId', showsController.delete);
router.patch(
  '/:showId/status',
  schemaValidate(showValidators.updateStatus),
  showsController.updateStatus
);
router.patch(
  '/:showId/favorite',
  schemaValidate(showValidators.updateFavorite),
  showsController.updateFavorite
);

module.exports = router;
