import jwt from 'jsonwebtoken';
import db from '../startup/db/db';

function auth(req, res, next) {
  const token = request.headers['x-access-token'];
  if (!token) return res.status(400).send({ status: 400, error: 'No Token provided'});

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const text = 'SELECT * from users WHERE id = $1';
    const { rows } = db.query(text, [decoded.userId]);
    if (!rows[0]) return res.status(400).send(
      {
        status: 400,
        error: 'The token you provided is invalid'
      })
    
    req.user = { id: decoded.userId };
    next();
  } catch(error) {
    return res.status(400).send({ status: 400, error: error })
  };
}

export default auth;
