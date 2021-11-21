const express = require('express');

const { Show } = require('../models');
const { schemaValidate, auth } = require('../middlewares');
const { showValidators } = require('../validationSchemas');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let { search, perPage = 2, page = 1, sortBy, sortOrder } = req.query;
    if (page === '') {
      page = 1;
    }

    // Ascending - asc
    // Descending - desc

    const shows = await Show.find(
      {
        title: {
          $regex: search,
          $options: 'i',
        },
      },
      null,
      {
        limit: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage),
        sort: {
          // [sortBy]: sortOrder === 'asc' ? 1 : -1,
          [sortBy]: Number(sortOrder),
        },
      }
    );

    const count = await Show.countDocuments({
      title: {
        $regex: search,
        $options: 'i',
      },
    });

    res.json({
      shows,
      count: count,
      activePage: Number(page),
      perPage: Number(perPage),
      pagesCount: Math.ceil(count / Number(perPage)),
    });
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

router.get('/:showId', async (req, res) => {
  try {
    const targetShow = await Show.findById(req.params.showId);
    res.json(targetShow);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:showId', async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.json({ message: 'Show deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Patch status
router.patch(
  '/:showId/status',
  schemaValidate(showValidators.updateStatus),
  async (req, res) => {
    try {
      const updatedShow = await Show.findByIdAndUpdate(
        req.params.showId,
        {
          status: req.body.status,
        },
        { new: true }
      );
      res.json(updatedShow);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

// Patch favorite
router.patch(
  '/:showId/favorite',
  schemaValidate(showValidators.updateFavorite),
  async (req, res) => {
    try {
      const updatedShow = await Show.findByIdAndUpdate(
        req.params.showId,
        {
          favorite: req.body.favorite,
        },
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
