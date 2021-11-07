const express = require('express');

const { Show } = require('../models');
const { schemaValidate } = require('../middlewares');
const { showValidators } = require('../validationSchemas');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    const shows = await Show.find({
      title: {
        $regex: search,
        $options: 'i',
      },
    });
    res.json(shows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', schemaValidate(showValidators.create), async (req, res) => {
  try {
    const newShow = await Show.create(req.body);
    res.json(newShow);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put(
  '/:showId',
  schemaValidate(showValidators.update),
  async (req, res) => {
    try {
      const updatedShow = await Show.findByIdAndUpdate(
        req.params.showId,
        req.body,
        { new: true }
      );
      res.json(updatedShow);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

module.exports = router;
