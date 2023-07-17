const { Router } = require('express');

const router = Router();

const personData = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
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
};

router.get('/', (req, res) => {
  res.json(personData);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const personToReturn = personData.find((person) => person.id === id);
  if (personToReturn) {
    res.status(200).json(personToReturn);
  } else {
    res.status(404).json(errors.noDataFound);
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const personToDelete = personData.find((person) => person.id === id);
  if (personToDelete) {
    personData.splice(personData.indexOf(personToDelete), 1);
    res.status(204).end();
  } else {
    res.status(404).json(errors.noDataFound);
  }
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const personToUpdate = personData.find((person) => person.id === id);
  if (personToUpdate) {
    if (!req.body.name || !req.body.number) {
      return res.status(400).json(errors.nameMissing);
    }

    const updatedPerson = {
      id: personToUpdate.id,
      name: req.body.name,
      number: req.body.number,
    };
    personData.splice(personData.indexOf(personToUpdate), 1, updatedPerson);
    return res.status(200).json(updatedPerson);
  }

  return res.status(404).json(errors.noDataFound);
});

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json(errors.missingDetails);
  }

  const personExists = personData.find((person) => person.name === req.body.name);

  if (personExists) {
    return res.status(400).json(errors.notUnique);
  }

  const newPerson = {
    id: crypto.randomUUID(),
    name: req.body.name,
    number: req.body.number,
  };

  personData.push(newPerson);
  return res.status(201).json(newPerson);
});

module.exports = router;
