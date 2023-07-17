const express = require('express');

const app = express();

// import person router
const personRouter = require('./routes/persons.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/persons', personRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
