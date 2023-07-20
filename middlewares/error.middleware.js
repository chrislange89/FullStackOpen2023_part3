const errorHandler = (err, _req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  return next(err);
};

module.exports = errorHandler;
