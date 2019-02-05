/* eslint-disable no-console */
/* eslint-disable import/named */

import { client } from '../../config';

const sql = 'INSERT INTO comments (user_id, comment, question_id) VALUES($1,$2,$3)';

const data = [1, 'this is a new comment', 1];

client.query(sql, data)
  .then(() => {
    console.log('comment table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
