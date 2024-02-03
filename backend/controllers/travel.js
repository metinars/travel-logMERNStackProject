const tryCatch = require('./utils/tryCatch');
const Travel = require('../models/Travel');

const createTravel = tryCatch(async (req, res) => {
  const { id: uId, name: uName } = req.user;
  const newTravel = new Travel({ ...req.body, uId, uName });
  await newTravel.save();
  setTimeout(() => {
    res.status(201).json({ success: true, result: newTravel });
  }, 1000);
});

const getTravels = tryCatch(async (req, res) => {
  const travels = await Travel.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: travels });
});

module.exports = { createTravel, getTravels };
