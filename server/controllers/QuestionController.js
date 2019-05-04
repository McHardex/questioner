/* eslint-disable import/named */

import { client } from '../config';

class QuestionController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */
  static getAllQuestions(req, res) {
    client.query('SELECT * FROM asknow ORDER by id ASC', (error, results) => {
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
      return results;
    });
  }

  static createQuestion(req, res) {
    client.query('SELECT * FROM meetups WHERE id = $1',
      [req.body.meetup_id],
      (error, results) => {
        if (results.rows === undefined || results.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'meetup does not exist',
          });
        }
        client.query('INSERT INTO asknow (createdby, title, body, meetup_id) VALUES ($1, $2, $3, $4) RETURNING *',
          [req.user, req.body.title, req.body.body, req.body.meetup_id],
          (err, response) => {
            if (err) return res.status(403).json({ status: 403, error: err });
            res.status(201).json({
              status: 201,
              data: [{
                id: response.rows[0].id,
                createdby: response.rows[0].createdby,
                meetup_id: results.rows[0].id,
                title: response.rows[0].title,
                body: response.rows[0].body,
              }],
            });
            return response;
          });
        return results;
      });
  }

  static upvoteDownvoteQuestion(req, res) {
    client.query(`SELECT votes from asknow WHERE id=${req.params.question_id}`,
      (err, newResponse) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: err,
          });
        }
        if (newResponse.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'no votes by user on this question',
          });
        }
        client.query(`SELECT * FROM votes WHERE user_id=${req.user}
        AND question_id=${req.params.question_id}`, (error, resp) => {
          if (error) {
            return res.status(403).json({
              status: 403,
              error,
            });
          }
          if (resp.rowCount < 1) {
            client.query(`UPDATE asknow SET votes = votes + 1 WHERE id = ${req.params.question_id}
            RETURNING *`, (e, response) => {
              if (error) {
                return res.status(403).json({
                  status: 403,
                  error: e,
                });
              }
              client.query('INSERT INTO votes (user_id, question_id) VALUES ($1, $2)',
                [req.user, req.params.question_id], (ee, newVal) => {
                  res.status(200).json({
                    status: 200,
                    data: [{
                      title: response.rows[0].title,
                      body: response.rows[0].body,
                      votes: response.rows[0].votes,
                    }],
                  });
                  return newVal;
                });
              return response;
            });
          } else {
            client.query(`UPDATE asknow SET votes = votes - 1 WHERE id = ${req.params.question_id}
            RETURNING *`, (e, response) => {
              if (error) {
                return res.status(403).json({
                  status: 403,
                  error: e,
                });
              }
              res.status(200).json({
                status: 200,
                data: [{
                  title: response.rows[0].title,
                  body: response.rows[0].body,
                  votes: response.rows[0].votes,
                }],
              });
              client.query(`DELETE FROM votes WHERE id=${resp.rows[0].id}`);
              return response;
            });
          }
          return resp;
        });
        return newResponse;
      });
  }
}

export default QuestionController;
