/* eslint-disable consistent-return */
import Helper from './Helper';

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
    if (!req.body.password || !req.body.email) {
      res.status(400).send({
        status: 400,
        error: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      res.status(400).send({
        status: 400,
        error: 'Please enter a valid email address',
      });
    }

    const hashPassword = Helper.hashPassword(req.body.password);

    const {
      firstname,
      lastname,
      othername,
      email,
      phoneNumber,
      username,
    } = req.body;

    pool.query(`INSERT INTO users
    (firstname, lastname, othername, email, phoneNumber, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [firstname, lastname, othername, email, phoneNumber, username, hashPassword],
    (error, results) => {
      if (error.routine === '_bt_check_unique') {
        res.status(400).send({
          status: 400,
          error: 'User with that email already exists',
        });
      }

      const createdUser = results.rows[0];
      const token = Helper.generateToken(createdUser.id);

      res.status(201).send({
        status: 201,
        data: [{
          token,
          user: createdUser,
        }],
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
    if (!req.body.password || !req.body.email) {
      res.status(400).send({
        status: 400,
        error: 'Some values are missing',
      });
    }

    if (req.body.password.trim().length < 5) {
      res.status(400).send({
        status: 400,
        error: 'Password must be greater than 5',
      });
    }

    if (!Helper.isValidEmail(req.body.email)) {
      res.status(400).send({
        status: 400,
        error: 'Please enter a valid email address',
      });
    }

    pool.query('SELECT * FROM users WHERE email = $1', (error, results) => {
      if (!results.rows) {
        res.status(400).send({
          status: 400,
          error: 'The credentials you provided is incorrect',
        });
      }

      if (!Helper.comparePassword(results.rows.password, req.body.password)) {
        res.status(400).send({
          status: 400,
          error: 'Incorrect password',
        });
      }

      const token = Helper.generateToken(results.rows.id);
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user: results.row,
        }],
      });
    });
  }
}

export default UserController;
