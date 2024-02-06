const router = require('express').Router();

const {
  createTravel,
  getTravels,
  getTravelDetail,
} = require('../controllers/travel');
const auth = require('../middleware/auth');

router.post('/new', auth, createTravel);
router.get('/getAll', getTravels);
router.get('/:id', getTravelDetail);

module.exports = router;
