const { Show } = require('../models');

exports.getAll = async (req, res) => {
  try {
    let { search, perPage = 2, page = 1, sortBy, sortOrder } = req.query;
    if (page === '') {
      page = 1;
    }

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
};

exports.create = async (req, res) => {
  try {
    const newShow = await Show.create(req.body);
    res.json(newShow);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
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
};

exports.getById = async (req, res) => {
  try {
    const targetShow = await Show.findById(req.params.showId);
    res.json(targetShow);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.json({ message: 'Show deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateStatus = async (req, res) => {
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
};

exports.updateFavorite = async (req, res) => {
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
};
