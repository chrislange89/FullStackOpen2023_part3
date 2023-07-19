const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.MONGO_URI.replace('<password>', process.env.MONGO_PASSWORD);

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Could not connect to MongoDB', err);
  });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Phonebook', phonebookSchema);
