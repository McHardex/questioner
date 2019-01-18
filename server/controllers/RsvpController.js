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
          error: 'No meetup record found',
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static createRsvp(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1', [req.params.meetup_id], (err, response) => {
      if (err) {
        return es.status(404).json({
          status: 404,
          error
        });
      }
      if (response.rows[0].id) {
        client.query('INSERT INTO rsvps (response) VALUES ($1) RETURNING *', [req.body.response], (error, result) => {
          console.log(error);
          console.log(response);
          if (req.body.response === 'yes') {
            res.status(200).json({
              status: 200,
              data: [{
                meetup_id: response.rows[0].id,
                topic: response.rows[0].topic,
                response: result.rows[0].response,
              }],
            });
          } else if (req.body.response === 'no') {
            res.status(200).json({
              status: 200,
              data: [{
                meetup_id: response.rows[0].id,
                topic: response.rows[0].topic,
                response: result.rows[0].response,
              }],
            });
          } else if (req.body.response === 'maybe') {
            res.status(200).json({
              status: 200,
              data: [{
                meetup_id: response.rows[0].id,
                topic: response.rows[0].topic,
                response: result.rows[0].response,
              }],
            });
          } else {
            res.status(200).json({
              status: 200,
              error: 'You can only respond with yes, no or maybe',
            });
          }
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'no user found',
        });
      }
    });
  }
}

export default RsvpController;
