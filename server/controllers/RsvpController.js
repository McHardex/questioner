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
      return res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static getRsvpByUser(req, res) {
    client.query(`SELECT * FROM rsvps 
    WHERE meetup_id = $1 
    AND user_id = $2`,
    [req.params.meetup_id, req.user], (error, results) => {
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
      return res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static createRsvp(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1', [req.params.meetup_id], (err, response) => {
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'meetup does not exist',
        });
      }
      if (req.body.response === 'maybe') {
        client.query('DELETE FROM rsvps WHERE user_id = $1 AND meetup_id = $2', [req.user, req.params.meetup_id], (error) => {
          if (error) res.status(500).json({ status: 500, error });
        });
        client.query('INSERT INTO rsvps (meetup_id, user_id, response) VALUES ($1, $2, $3) RETURNING *',
          [req.params.meetup_id, req.user, req.body.response], () => res.status(201).json({
            status: 201,
            message: 'maybe',
          }));
      } else if (req.body.response === 'yes') {
        client.query('DELETE FROM rsvps WHERE user_id = $1 AND meetup_id = $2', [req.user, req.params.meetup_id], (error) => {
          if (error) res.status(500).json({ status: 500, error });
        });
        client.query('INSERT INTO rsvps (meetup_id, user_id, response) VALUES ($1, $2, $3) RETURNING *',
          [req.params.meetup_id, req.user, req.body.response], () => res.status(201).json({
            status: 201,
            message: 'yes',
          }));
      } else if (req.body.response === 'no') {
        client.query('DELETE FROM rsvps WHERE user_id = $1 AND meetup_id = $2', [req.user, req.params.meetup_id], (error) => {
          if (error) res.status(500).json({ status: 500, error });
        });
        client.query('INSERT INTO rsvps (meetup_id, user_id, response) VALUES ($1, $2, $3) RETURNING *',
          [req.params.meetup_id, req.user, req.body.response], () => res.status(201).json({
            status: 201,
            message: 'no',
          }));
      }
      return response;
    });
  }
}

export default RsvpController;
