const { Router } = require('express');
const router = Router();

const uri = 'http://localhost:3000/api/persons'

router.get('/', async (req, res) => {
  const numberPeople = await fetch(uri)
    .then(async (res) => res.json())
    .then(async (data) => data.length)
    .catch((err) => console.log(err));
  const date = new Date();
  res.send(`Phonebook has info for ${numberPeople} people <br> ${date}`);
});

module.exports = router;