/* eslint-disable consistent-return */
import { Client } from 'pg';

import connectionString from '../config';

import Helper from './helpers/Helpers';

const client = new Client(connectionString);
client.connect();

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
      users (firstname, lastname, othername, username, phoneNumber, email, isadmin, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.username,
      req.body.phoneNumber,
      req.body.email,
      req.body.isAdmin,
      hashPassword,
    ];
    client.query(query, values, (error, results) => {
      if (error) {
        res.status(409).json({
          status: 409,
          error: 'User exists, check your credentials',
        });
      } else {
        const token = Helper.generateToken(results.rows[0].id);
        return res.status(201).json({
          status: 201,
          data: {
            token,
            user: {
              id: results.rows[0].id,
              username: results.rows[0].username,
              email: results.rows[0].email,
              isAdmin: results.rows[0].isadmin,
              registered: results.rows[0].registered,
            },
          },
        });
      }
    });
  }

  /**
   * @description - Log in to the application
   * @param {Object} - response
   * @param {object} - request
   * @returns {Object} - user Object
   */

  static login(req, res) {
    client.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, results) => {
      if (error) {
        res.status(403).json({
          status: 403,
          error,
        });
      }
      if (results.rows.length < 1) {
        res.status(404).json({
          status: 404,
          error: 'No such user in our database',
        });
      } else if ((results.rows[0].email !== req.body.email)
      || (!Helper.comparePassword(results.rows[0].password, req.body.password))) {
        res.status(400).json({
          status: 400,
          error: 'Invalid credentials',
        });
      } else {
        const token = Helper.generateToken(results.rows[0].id);
        res.status(200).json({
          status: 200,
          data: [{
            token,
            user: {
              id: results.rows[0].id,
              email: results.rows[0].email,
              username: results.rows[0].username,
              isAdmin: results.rows[0].isadmin,
              firstname: results.rows[0].firstname,
              lastname: results.rows[0].lastname,
              othername: results.rows[0].othername,
            },
          }],
        });
      }
    });
  }
}

export default UserController;
