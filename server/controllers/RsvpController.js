/* eslint-disable import/named */

import { client } from '../config';

class RsvpController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */

  static getAllRsvps(req, res) {
    client.query(`SELECT * FROM rsvps 
    WHERE meetup_id = $1 
    AND response = 'yes'`,
    [req.params.meetup_id], (error, results) => {
      if (error) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      if (results.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'no rsvp record found',
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
      return results;
    });
  }

  static createRsvp(req, res) {
    const responseArray = ['yes', 'no', 'maybe'];
    client.query('SELECT * FROM meetups WHERE id = $1', [req.params.meetup_id], (err, response) => {
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'meetup does not exist',
        });
      }
      if (responseArray.includes(req.body.response)) {
        client.query('INSERT INTO rsvps (meetup_id, user_id, response) VALUES ($1, $2, $3) RETURNING *',
          [req.params.meetup_id, req.user, req.body.response], (e, result) => {
            if (e) {
              res.status(409).json({
                status: 409,
                error: 'You can only respond once',
              });
            } else {
              res.status(201).json({
                status: 201,
                data: [{
                  meetup_id: result.rows[0].meetup_id,
                  topic: response.rows[0].topic,
                  response: result.rows[0].response,
                }],
              });
            }
          });
      } else {
        return res.status(400).json({
          status: 400,
          error: 'Respond only with yes, no or maybe',
        });
      }
      return response;
    });
  }
}

export default RsvpController;
