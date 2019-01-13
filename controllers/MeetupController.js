/* eslint-disable consistent-return */

require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DB_URL });

class MeetupController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllMeetups(req, res) {
    pool.query('SELECT * FROM meetups ORDER by id ASC', (error, results) => {
      if (error) throw error;
      return res.status(200).send({
        status: 200,
        data: results.rows,
      });
    });
  }

  static async upcomingMeetups(req, res) {
    pool.query('SELECT * FROM meetups WHERE happeningOn > now()', (error, results) => {
      if (error) {
        return res.status(404).send({
          status: 404,
          error: 'There is no upcoming meetups',
        });
      }
      if (results.rows === undefined || results.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          error: 'there are no upcoming meetups',
        });
      }
      res.status(200).send({
        status: 200,
        data: results.rows,
      });
    });
  }

  static async getSpecificMeetupRecord(req, res) {
    const meetupId = parseInt(req.params.id, 10);
    pool.query('SELECT * FROM meetups WHERE id = $1', [meetupId], (error, results) => {
      if (results.rows === undefined || results.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          error: 'No meetup with the id',
        });
      }
      return res.status(200).send({
        status: 200,
        data: results.rows,
      });
    });
  }

  static async createMeetup(req, res) {
    const {
      topic, location, happeningOn, tags,
    } = req.body;

    pool.query(`INSERT INTO meetups 
    (topic, location, happeningOn, tags) VALUES ($1, $2, $3, $4) RETURNING *`,
    [topic, location, happeningOn, tags], (error, results) => {
      if (error) {
        res.status(409).send({
          status: 409,
          error: 'Meetup with the same topic already exists',
          newError: error,
          anotherEroor: error.routine,
        });
      } else {
        res.status(201).send({
          status: 201,
          data: [results.rows[0]],
        });
      }
    });
  }
}

export default MeetupController;
