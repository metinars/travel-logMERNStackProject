const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    desc: {
      type: String,
      require: true,
      min: 3,
    },
    imageUrl: {
      type: String,
    },
    uId: {
      type: String,
      require: true,
    },
    uName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('travels', TravelSchema);
