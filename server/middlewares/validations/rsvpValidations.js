/* eslint-disable consistent-return */

const createRsvpValidation = (req, res, next) => {
  if (!req.body.response) return res.status(400).send({ status: 400, error: 'Kindly input your response.Limited space available' });
  if (req.body.response.toLowerCase() !== 'yes' || 'no' || 'maybe') {
    return res.status(400).json({
      status: 400,
      error: 'You can only input Yes, No or Maybe',
    });
  }

  next();
};

export default createRsvpValidation;
