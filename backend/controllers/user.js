const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const tryCatch = require('./utils/tryCatch');

const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  }
  const emailLowerCase = email.toString().toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser) {
    return res
      .status(400)
      .json({ success: false, message: 'User already exists!' });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  const { _id: id } = user;
  const token = jwt.sign({ id, name }, 'gizliJwtSecret', {
    expiresIn: '1h',
  });
  res
    .status(201)
    .json({ success: true, result: { id, name, email: user.email, token } });
});

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: 'User does not exist!' });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: 'Invalid credentials' });

  const { _id: id, name } = existedUser;
  const token = jwt.sign({ id, name }, 'gizliJwtSecret', {
    expiresIn: '1h',
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, token },
  });
});

module.exports = { register, login };
