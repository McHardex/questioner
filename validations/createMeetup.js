/* eslint-disable consistent-return */

const isValidDate = (dateString) => {
  const regEx = /^\d{2}-\d{2}-\d{4}$/;
  return dateString.match(regEx) != null;
};

function validateCreateMeetup(req, res, next) {
  if (!req.body.title) return res.status(400).send({ message: 'title is required' });
  if (req.body.title.trim().length < 5) return res.status(400).send({ message: 'title length must be greater than 5' });

  if (!req.body.location) return res.status(400).send({ message: 'location is required' });
  if (req.body.location.trim().length < 3) return res.status(400).send({ message: 'location length must be greater than 3' });

  if (!req.body.happeningOn) return res.status(400).send({ message: 'date happeningOn is required' });
  if (!isValidDate(req.body.happeningOn)) return res.status(400).send({ message: 'the date must be in this format: mm-dd-yyy' });

  if (!req.body.tags) return res.status(400).send({ message: 'tags is required' });
  if (req.body.tags.length < 3) return res.status(400).send({ message: 'tags length must be greater than 3' });

  next();
}

export default validateCreateMeetup;
