const validate = (err, res, next) => {
  if (err) {
    res.status(422).json({
      status: '422',
      error: err.details[0].message.split('"').join(''),
    });
  } else {
    next();
  }
};

export default validate;
