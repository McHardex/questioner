/* eslint-disable consistent-return */

const createMeetupValidation = (req, res, next) => {
  if (!req.body.topic) return res.status(400).send({ status: 400, error: 'topic is required' });

  if (!req.body.location) return res.status(400).send({ status: 400, error: 'location is required' });

  if (!req.body.happeningOn) return res.status(400).send({ status: 400, error: 'date is required' });
  if (req.body.happeningOn.length < 8) return res.status(400).send({ status: 400, error: 'date must be in this format: yyyy-mm-dd or yyyy/mm/dd' });

  if (!req.body.tags) return res.status(400).send({ status: 400, error: 'tags is required' });
  if (req.body.tags.length < 3) return res.status(400).send({ status: 400, error: 'Please add a minimum of three(3) tags' });

  next();
};

export default createMeetupValidation;
