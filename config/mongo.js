const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const passwordToUse = (process.argv.length > 2) ? process.argv[2] : process.env.MONGO_PASSWORD;
const mongoConnectionString = process.env.MONGO_URI.replace('<password>', passwordToUse);

mongoose.connect(mongoConnectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log('Could not connect to MongoDB', err));

const db = mongoose.connection;

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

if (process.argv[3] === undefined || process.argv[4] === undefined) {
  Phonebook.find({}).then((result) => {
    console.log('Phonebook:');
    result.forEach((personFound) => {
      console.log(personFound.toJSON());
      // console.log(`${personFound.name} ${personFound.number}`);
    });
    db.close();
    process.exit(1);
  });
} else {
  const person = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`Added name: '${result.name}' with number: '${result.number}' to phonebook`);
    db.close();
  });
}
