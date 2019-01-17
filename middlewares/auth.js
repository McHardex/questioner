/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DB_URL });

const auth = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ status: 401, error: 'No Token provided' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) return res.status(400).json({ status: 400, error: 'token has expired' });

    const text = 'SELECT * from users WHERE id = $1';

    pool.query(text, [decoded.userID]);

    req.user = decoded.userID;
    next();
  } catch (error) {
    return res.status(422).json({
      status: 422,
      error: error.message,
    });
  }
};

export default auth;
