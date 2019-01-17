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
    client.query('SELECT * FROM questions ORDER by id ASC', (error, results) => {
      if (error) throw error;
      return res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static createRsvp(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1', [req.params.meetup_id], (err, response) => {
      console.log(err, 'err');
      console.log(response, 'response');
      if (err) return res.status(404).json({ status: 404, error: err });
      client.query('INSERT INTO rsvps (response) VALUES ($1) RETURNING *', [req.body.response], (error, result) => {
        console.log(error, 'err');
        console.log(result, 'result');
        if (error) return res.status(404).json({ status: 404, error });
        res.status(200).json({
          status: 200,
          data: [{
            meetup_id: response.rows[0].id,
            topic: response.rows[0].topic,
            status: result.rows[0].response,
          }],
        });
      });
    });
  }
}

export default RsvpController;
