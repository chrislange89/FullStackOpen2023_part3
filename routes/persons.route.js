const { Router } = require('express');

const router = Router();

const personData = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const errors = {
  nameMissing: {
    error: 'name is missing',
  },
  noDataFound: {
    error: 'No data found',
  },
  missingDetails: {
    error: 'name or number is missing',
  },
  notUnique: {
    error: 'name must be unique',
  },
  internalServerError: {
    error: 'Internal server error',
  },
};

const Phonebook = require('../models/phonebook.model');

router.get('/', async (req, res) => {
  await Phonebook.find({}).then((result) => {
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const personToReturn = personData.find((person) => person.id === id);
  if (personToReturn) {
    res.status(200).json(personToReturn);
  } else {
    res.status(404).json(errors.noDataFound);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const personToDelete = Phonebook.findById(id);
  if (personToDelete) {
    Phonebook.findByIdAndDelete(id).then((result) => {
      console.log(result);
      res.status(204).json(result);
    });
  } else {
    res.status(404).json(errors.noDataFound);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json(errors.missingDetails);
  }

  // find person in mongoose and update using findByIdAndUpdate,
  // then return the updated person
  try {
    Phonebook.findByIdAndUpdate(id, { name, number }, { new: true })
      .then((updatedPerson) => res.json(updatedPerson))
      .catch((err) => {
        console.log(err);
        return res.status(404).json(errors.noDataFound);
      });
  } catch {
    return res.status(500).json(errors.internalServerError);
  }
});

router.post('/', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.json(errors.missingDetails);
  }

  // if the person with that name already exists return an error
  Phonebook.find({ name }).then(async (result) => {
    if (result.length > 0) {
      return res.status(400).json(errors.notUnique);
    }
    const newPerson = new Phonebook({
      name,
      number,
    });
    try {
      const savedPerson = await newPerson.save();
      console.log(savedPerson);
      return res.status(201).json(savedPerson);
    } catch (err) {
      console.log(err);
      return res.status(500).json(errors.internalServerError);
    }
  });
});

module.exports = router;
