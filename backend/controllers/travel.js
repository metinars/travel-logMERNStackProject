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

module.exports = createTravel;
