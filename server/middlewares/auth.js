/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DB_URL });

const auth = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) res.status(401).json({ status: 401, error: 'No Token provided' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const text = 'SELECT * from users WHERE id = $1';

    pool.query(text, [decoded.userID]);

    req.user = decoded.userID;
    next();
  } catch (error) {
    res.status(422).json({
      status: 422,
      error: error.message,
    });
  }
};

export default auth;
