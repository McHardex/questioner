/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Client } from 'pg';

import connectionString from '../config';

require('dotenv').config();


const client = new Client(connectionString);
client.connect();

class MeetupController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllMeetups(req, res) {
    client.query('SELECT * FROM meetups ORDER by id ASC', (results) => {
      if (results.rows === undefined || results.rows.length === 0) {
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

  static upcomingMeetups(req, res) {
    client.query('SELECT * FROM meetups WHERE happeningOn > now()', (error, results) => {
      if (error) {
        return res.status(404).json({
          status: 404,
          error: 'There is no upcoming meetups',
        });
      }
      if (results.rows === undefined || results.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'there are no upcoming meetups',
        });
      }
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static getSpecificMeetupRecord(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1', [req.params.id], (results) => {
      if (results.rows === undefined || results.rows.length === 0) return res.status(404).json({ status: 404, error: 'Meetup record does not exist' });
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
    });
  }

  static createMeetup(req, res) {
    const {
      topic, location, happeningOn, tags,
    } = req.body;
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err.stack,
        });
      }
      if (result.rows[0].isadmin) {
        client.query(`INSERT INTO meetups 
        (topic, location, happeningOn, tags) VALUES ($1, $2, $3, $4) RETURNING *`,
        [topic, location, happeningOn, tags], (results) => {
          if (results.rowCount < 1) {
            res.status(404).json({
              status: 404,
              error: 'Meetup already exists, try creating a new one',
            });
          } else {
            return res.status(201).json({
              status: 201,
              data: [results.rows[0]],
            });
          }
        });
      } else {
        res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
      }
    });
  }

  static deleteMeetup(req, res) {
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (err, result) => {
      if (err) return res.status(400).json({ status: 400, error: err });
      if (result.rows[0].isadmin) {
        client.query('DELETE FROM meetups WHERE id = $1', [req.params.id], (error, response) => {
          if (response.rows === undefined || response.rows.length === 0) {
            res.status(404).json({
              status: 404,
              message: 'This meetup is no longer available',
            });
          } else {
            res.status(200).json({
              status: 200,
              message: 'Meetup successfully deleted',
            });
          }
        });
      } else {
        res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
      }
    });
  }


  static updateMeetup(req, res) {
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (result) => {
      if (result.rows === undefined || result.rows.length === 0) {
        res.status(404).json({
          status: 404,
          error: 'User not found!'
        });
      }
      if (result.rows[0].isadmin) {
        const meetupId = parseInt(req.params.id, 10);
        const {
          topic, location, happeningOn, tags,
        } = req.body;
        client.query('UPDATE meetups SET topic = $1, location = $2, happeningOn = $3, tags = $4 WHERE id = $5',
          [topic, location, happeningOn, tags, meetupId], (response) => {
            if (response.rows === undefined || response.rows.length === 0) {
              res.status(404).json({
                status: 404,
                error: 'Unable to update! No meetup found',
              });
            } else {
              res.status(200).json({
                status: 200,
                message: 'Meetup successfully updated',
              });
            }
          });
      } else {
        return res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
      }
    });
  }
}

export default MeetupController;
