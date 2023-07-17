const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// import person router
const personRouter = require('./routes/persons.route');
const infoRouter = require('./routes/info.route');

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

app.use('/api/persons', personRouter);
app.use('/info', infoRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
