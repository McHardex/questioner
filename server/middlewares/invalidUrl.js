const invalidUrl = (req, res, next) => {
  // if an invalid route is visited, return this error message
  res.status(404).json({
    status: 404,
    error: 'Route not found, please enter a valid url',
  });
  next();
};

export default invalidUrl;
