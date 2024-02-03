const router = require('express').Router();

const { createTravel, getTravels } = require('../controllers/travel');
const auth = require('../middleware/auth');

router.post('/new', auth, createTravel);
router.get('/getAll', getTravels);

module.exports = router;
