/* eslint-disable consistent-return */
/* eslint-disable no-console */

import { Client } from 'pg';

import dotenv from 'dotenv';

import connectionString from '../config';

dotenv.config();

const client = new Client(connectionString);
client.connect();

class RsvpController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */

  static getAllRsvps(req, res) {
    client.query('SELECT * FROM rsvps ORDER by id ASC', (error, results) => {
      if (results.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No rsvp record found',
        });
      }
      res.status(201).json({
        status: 201,
        data: results.rows,
      });
    });
  }

  static createRsvp(req, res) {
    const responseArray = ['yes', 'no', 'maybe'];
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (error, resp) => {
      if (resp.rowCount < 1) {
        return res.status(404).send({
          status: 404,
          error: 'User does not exist'
        });
      }
      client.query('SELECT * FROM meetups WHERE id = $1', [req.params.meetup_id], (err, response) => {
        if (response.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'meetup does not exist'
          });
        }
        if (responseArray.includes(req.body.response)) {
          client.query(`INSERT INTO rsvps (meetup_id, user_id, response) VALUES ($1, $2, $3) RETURNING *`,
            [req.user, response.rows[0].id, req.body.response], (e, result) => {
              if (e) {
                res.status(409).json({
                  status: 409,
                  error: 'You can only respond once'
                });
              } else {
                res.status(201).json({
                  status: 201,
                  data: [{
                    meetup_id: response.rows[0].id,
                    topic: response.rows[0].topic,
                    response: result.rows[0].response,
                  }],
                });
              }
            });
        } else {
          return res.status(400).json({
            status: 400,
            error: 'Respond only with yes, no or maybe'
          });
        }
      });
    });
  }
}

export default RsvpController;
