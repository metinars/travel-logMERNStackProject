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

const getTravelDetail = tryCatch(async (req, res) => {
  const { id } = req.params;
  const travel = await Travel.findById(id);
  res.status(200).json({ success: true, result: travel });
});

const deleteTravel = tryCatch(async (req, res) => {
  try {
    const { id } = req.params;
    await Travel.findByIdAndDelete(id);
    res.status(200).json({
      message: `Deleting success! ${id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const editTravel = tryCatch(async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Travel.findByIdAndUpdate(id, data);
    res.status(200).json({
      message: 'Editing Success',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createTravel,
  getTravels,
  getTravelDetail,
  deleteTravel,
  editTravel,
};
