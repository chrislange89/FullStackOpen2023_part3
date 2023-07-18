const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoConnectionString = process.env.MONGO_URI;

mongoose.connect(mongoConnectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Could not connect to MongoDB', err));
