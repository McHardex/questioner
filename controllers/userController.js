/* eslint-disable consistent-return */
import Helper from './Helpers';

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DB_URL });

class UserController {
  /**
   * @description - creates a new user in the application
   * @param {Object} req - api request
   * @param {Object} res - route response
   * @returns {json} registered user details
  */

  static signUp(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const query = `INSERT INTO
      users (firstname, lastname, othername, username, phoneNumber, email, password)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.username,
      req.body.phoneNumber,
      req.body.email,
      hashPassword,
    ];

    pool.query(query, values, (error, results) => {
      if (error) {
        return res.status(409).send({
          status: 409,
          error: 'User with that email already exists',
        });
      }

      const token = Helper.generateToken(results.rows[0].id);
      return res.status(201).send({
        status: 201,
        data: {
          token,
          user: results.rows[0],
        },
      });
    });
  }

  /**
   * @description - Log in to the application
   * @param {Object} - response
   * @param {object} - request
   * @returns {Object} - user Object
   */

  static login(req, res) {
    pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, results) => {
      if (!results.rows[0]) {
        return res.status(400).send({
          status: 400,
          error: 'No such user in our database, check your credentials',
        });
      }

      if (!Helper.comparePassword(results.rows[0].password, req.body.password)
      || req.body.password.trim().length < 5) {
        return res.status(400).send({
          status: 400,
          error: 'Incorrect password',
        });
      }

      const token = Helper.generateToken(results.rows[0].id);
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user: results.rows[0],
        }],
      });
    });
  }
}

export default UserController;
