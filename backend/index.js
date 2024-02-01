const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const userRoute = require('./routes/users');
const pinRoute = require('./routes/travels');
const users = require('./routes/users');
const travels = require('./routes/travels');

dotenv.config();

const port = process.env.PORT || 8800;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use('/user', users);
app.use('/travel', travels);
app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log('MongoDB Connected');
      })
      .catch((err) => console.log(err));
    app.listen(port, () => {
      console.log('Backend server is running!');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
