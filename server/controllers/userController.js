/* eslint-disable import/named */

import { client } from '../config';

import Helper from './helpers/Helpers';

class UserController {
  /**
   * @description - creates a new user in the application
   * @param {Object} req - api request
   * @param {Object} res - route response
   * @returns {json} registered user details
   */

  static signUp(req, res) {
    const password = Helper.hashPassword(req.body.password);
    const confirmPassword = Helper.hashPassword(req.body.confirmPassword);
    const query = `INSERT INTO
      users (email, username, isadmin, password, confirmPassword)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.email.toLowerCase(),
      req.body.username,
      req.body.isAdmin,
      password,
      confirmPassword,
    ];
    client.query(query, values, (error, results) => {
      if (error) {
        res.status(409).json({
          status: 409,
          error: 'User already exists, check your credentials',
        });
      } else {
        const token = Helper.generateToken(results.rows[0].id);
        res.status(201).json({
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
    client.query(
      'SELECT * FROM users WHERE email = $1',
      [req.body.email],
      (error, results) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error,
          });
        }
        if (
          results.rows.length < 1
          || !Helper.comparePassword(results.rows[0].password, req.body.password)
        ) {
          res.status(400).json({
            status: 400,
            error: 'Invalid email/password',
          });
        } else {
          const token = Helper.generateToken(results.rows[0].id);
          res.status(200).json({
            status: 200,
            data: [
              {
                token,
                user: {
                  id: results.rows[0].id,
                  username: results.rows[0].username,
                  isAdmin: results.rows[0].isadmin,
                },
              },
            ],
          });
        }
      },
    );
  }

  // get currently logged in user
  static getUser(req, res) {
    client.query(
      'SELECT * FROM users WHERE id = $1',
      [req.user],
      (error, results) => {
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
        } else {
          res.status(200).json({
            status: 200,
            user: {
              id: results.rows[0].id,
              firstname: results.rows[0].firstname,
              lastname: results.rows[0].lastname,
              othername: results.rows[0].othername,
              email: results.rows[0].email,
              username: results.rows[0].username,
              registered: results.rows[0].registered,
              isAdmin: results.rows[0].isadmin,
            },
          });
        }
      },
    );
  }

  static updateUserProfile(req, res) {
    const {
      username, firstname, lastname, othername, phoneNumber,
    } = req.body;
    client.query(
      `UPDATE users SET username = $1, firstname = $2,
        lastname = $3, othername = $4, phoneNumber = $5 WHERE id = $6 RETURNING *`,
      [username, firstname, lastname, othername, phoneNumber, req.user],
      (err, response) => {
        if (err) {
          res.status(500).json({
            status: 500,
            error: err,
          });
        } else {
          res.status(200).json({
            status: 200,
            data: {
              id: response.rows[0].id,
              firstname: response.rows[0].firstname,
              lastname: response.rows[0].lastname,
              othername: response.rows[0].othername,
              email: response.rows[0].email,
              username: response.rows[0].username,
              registered: response.rows[0].registered,
              isAdmin: response.rows[0].isadmin,
            },
          });
        }
        return response;
      },
    );
  }
}

export default UserController;
