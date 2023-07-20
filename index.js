const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorHandler = require('./middlewares/error.middleware');

const app = express();

// routers
const personRouter = require('./routes/persons.route');
const infoRouter = require('./routes/info.route');

// config
dotenv.config();
morgan.token('body', (req) => JSON.stringify(req.body));
const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(morganFormat));
app.use(express.static('build'));
app.use(errorHandler);

// routes
app.use('/api/persons', personRouter);
app.use('/info', infoRouter);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
