const router = require('express').Router();

const {
  createTravel,
  getTravels,
  getTravelDetail,
  deleteTravel,
  editTravel,
} = require('../controllers/travel');
const auth = require('../middleware/auth');

router.post('/new', auth, createTravel);
router.get('/getAll', getTravels);
router.get('/:id', getTravelDetail);
router.delete('/:id', deleteTravel);
router.patch('/:id', editTravel);

module.exports = router;
