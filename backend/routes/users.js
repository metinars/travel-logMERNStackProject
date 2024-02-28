const router = require('express').Router();
const register = require('../controllers/user');
const login = require('../controllers/user');
const user = require('../controllers/user');

router.post('/signup', user.register);
router.post('/login', user.login);

module.exports = router;
