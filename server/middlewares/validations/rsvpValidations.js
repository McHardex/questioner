/* eslint-disable consistent-return */

const createRsvpValidation = (req, res, next) => {
  if (!req.body.response) return res.status(400).send({ status: 400, error: 'Kindly input your response.Limited space available' });
  if (req.body.response.trim().toLowerCase() !== 'yes') {
    res.status(200).json({
      status: 200,
      error: 'You can only respond with yes, no or maybe',
    });
  } else if (req.body.response.trim().toLowerCase() !== 'no') {
    return res.status(200).json({
      status: 200,
      error: 'You can only respond with yes, no or maybe',
    });
  } else if (req.body.response.trim().toLowerCase() !== 'maybe') {
    return res.status(200).json({
      status: 200,
      error: 'You can only respond with yes, no or maybe',
    });
  }

  next();
};

export default createRsvpValidation;
