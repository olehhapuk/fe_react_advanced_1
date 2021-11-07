const yup = require('yup');

const { showStatus } = require('../enum');

const titleValidator = yup.string();

exports.create = yup.object().shape({
  title: titleValidator.required(),
  imageUrl: yup.string().url().optional(),
  siteUrl: yup.string().url().optional(),
});

exports.update = yup.object().shape({
  title: titleValidator.optional(),
  imageUrl: yup.string().url().optional(),
  siteUrl: yup.string().url().optional(),
  season: yup.number().min(1).optional(),
  episode: yup.number().min(0).optional(),
  timecode: yup.string().optional(),
  status: yup.string().oneOf(Object.values(showStatus)).optional(),
  favorite: yup.bool().optional(),
});

exports.updateStatus = yup.object().shape({
  status: yup.string().oneOf(Object.values(showStatus)).required(),
});

exports.updateFavorite = yup.object().shape({
  favorite: yup.bool().required(),
});
