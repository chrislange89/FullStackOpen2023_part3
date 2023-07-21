const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const ErrorMessages = {
  NAME_MISSING: 'name is missing',
  NO_DATA_FOUND: 'No data found',
  MISSING_DETAILS: 'Name or number is missing',
  NOT_UNIQUE: 'Name must be unique',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_ID: 'Invalid id',
};

const Phonebook = require('../models/phonebook.model');

// eslint-disable-next-line consistent-return
router.get('/', async (_req, res, next) => {
  try {
    const result = await Phonebook.find({});
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line consistent-return
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(ErrorMessages.INVALID_ID);
  }
  try {
    const result = await Phonebook.findById(mongoose.Types.ObjectId(id));
    if (result) {
      return res.json(result);
    }
    return res.status(404).json(ErrorMessages.NO_DATA_FOUND);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const personToDelete = Phonebook.findById(id);
  if (personToDelete) {
    try {
      Phonebook.findByIdAndDelete(id).then((result) => {
        console.log(result);
        res.status(204).json(result);
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).json(ErrorMessages.NO_DATA_FOUND);
  }
});

// eslint-disable-next-line consistent-return
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json(ErrorMessages.MISSING_DETAILS);
  }

  try {
    Phonebook.findByIdAndUpdate(id, { name, number }, { new: true })
      .then((updatedPerson) => res.json(updatedPerson))
      .catch((err) => {
        console.log(err);
        return res.status(404).json(ErrorMessages.NO_DATA_FOUND);
      });
  } catch (err) {
    next(err);
    return res.status(500).json(ErrorMessages.INTERNAL_SERVER_ERROR);
  }
});

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.json(ErrorMessages.MISSING_DETAILS);
  }

  // if the person with that name already exists return an error
  Phonebook.find({ name }).then(async (result) => {
    if (result.length > 0) {
      return res.status(400).json(ErrorMessages.NOT_UNIQUE);
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
      return res.status(500).json(ErrorMessages.INTERNAL_SERVER_ERROR);
    }
  });
});

module.exports = router;
