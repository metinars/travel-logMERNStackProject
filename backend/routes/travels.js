const router = require('express').Router();

const createTravel = require('../controllers/travel');
const auth = require('../middleware/auth');

router.post('/', auth, createTravel);

module.exports = router;
