const { Schema, model } = require('mongoose');

// const showStatus = require('../enum/showStatus');
const { showStatus } = require('../enum');

const Show = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },
    siteUrl: {
      type: String,
      required: false,
      default: '',
    },
    season: {
      type: Number,
      required: false,
      min: 1,
      default: 1,
    },
    episode: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    timecode: {
      type: String,
      required: false,
      default: '00:00:00',
    },
    status: {
      type: String,
      required: false,
      enum: Object.values(showStatus),
      default: showStatus.TO_WATCH,
    },
    favorite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('show', Show);
