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
router.delete('/:id', auth, deleteTravel);
router.patch('/:id', auth, editTravel);

module.exports = router;
