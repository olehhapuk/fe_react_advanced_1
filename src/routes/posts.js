const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares');
const { Tag, Post } = require('../models');

router.post('/', auth, async (req, res) => {
  try {
    const tagsArr = req.body.tags.split(', ');

    const existingTags = await Tag.find({
      name: {
        $in: tagsArr,
      },
    });

    const filteredTags = tagsArr.filter((tagName) => {
      return !existingTags.find((tag) => tag.name === tagName);
    });

    const tagsData = filteredTags.map((tagName) => ({ name: tagName }));
    const newTags = await Tag.insertMany(tagsData);

    const newPost = await Post.create({
      title: req.body.title,
      tags: [...existingTags, ...newTags],
      author: req.user._id,
    });

    res.json({
      tagsArr,
      existingTags,
      filteredTags,
      tagsData,
      newTags,
      newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
