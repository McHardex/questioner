/* eslint-disable import/named */

import { client } from '../config';

class MeetupController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllMeetups(req, res) {
    client.query('SELECT * FROM meetups ORDER by id ASC', (error, results) => {
      if (error) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      if (results.rows.length < 1) {
        res.status(404).json({
          status: 404,
          error: 'No meetup record found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
      return results;
    });
  }

  static upcomingMeetups(req, res) {
    client.query('SELECT * FROM meetups WHERE happeningOn > now()', (error, results) => {
      if (error) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      if (results.rows.length < 1) {
        res.status(404).json({
          status: 404,
          error: 'there are no upcoming meetups',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
      return results;
    });
  }

  static getSpecificMeetupRecord(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1', [req.params.id], (error, results) => {
      if (error) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      if (results.rows.length < 1) return res.status(404).json({ status: 404, error: 'Meetup record does not exist' });
      res.status(200).json({
        status: 200,
        data: results.rows,
      });
      return results;
    });
  }

  static createMeetup(req, res) {
    const {
      topic, location, happeningOn, tags,
    } = req.body;
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (err, result) => {
      if (result.rows.length < 1) res.status(404).send({ status: 404, error: 'User not found' });
      if (result.rows[0].isadmin) {
        client.query(`INSERT INTO meetups 
        (topic, location, happeningOn, tags) VALUES ($1, $2, $3, $4) RETURNING *`,
        [topic, location, happeningOn, tags], (error, results) => {
          if (error) {
            res.status(409).json({
              status: 409,
              error: 'Meetup with this topic already exists',
            });
          } else {
            res.status(201).json({
              status: 201,
              data: [results.rows[0]],
            });
          }
          return results;
        });
      } else {
        res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
      }
      return result;
    });
  }

  static deleteMeetup(req, res) {
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (err, result) => {
      if (err) res.status(403).json({ status: 403, error: err });
      if (result.rows[0].isadmin) {
        client.query('DELETE FROM meetups WHERE id = $1', [req.params.id], (error, response) => {
          if (error) res.status(403).json({ status: 403, error });
          if (response.rowCount < 1) {
            res.status(404).json({
              status: 404,
              error: 'This meetup is no longer available',
            });
          } else {
            res.status(200).json({
              status: 200,
              message: 'Meetup successfully deleted',
            });
          }
          return response;
        });
      } else {
        res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
      }
      return result;
    });
  }


  static updateMeetup(req, res) {
    client.query('SELECT * FROM users WHERE id = $1', [req.user], (error, result) => {
      if (error) res.status(404).json({ status: 404, error: 'User not found!' });
      if (result.rows[0].isadmin) {
        const {
          topic, location, happeningOn, tags,
        } = req.body;
        client.query('UPDATE meetups SET topic = $1, location = $2, happeningOn = $3, tags = $4 WHERE id = $5',
          [topic, location, happeningOn, tags, req.params.id], (err, response) => {
            if (err) {
              res.status(404).json({
                status: 404,
                error: err,
              });
            } else {
              res.status(200).json({
                status: 200,
                data: response.rows,
              });
            }
          });
      } else {
        res.status(401).json({ status: 401, error: 'Sorry, only Admin can perform this action' });
      }
      return result;
    });
  }
}

export default MeetupController;
