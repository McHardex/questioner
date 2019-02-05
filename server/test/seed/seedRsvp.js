/* eslint-disable no-console */
/* eslint-disable import/named */

import { client } from '../../config';

const sql = 'INSERT INTO rsvps (id, meetup_id, user_id, response) VALUES($1,$2,$3,$4)';

const data = [1, 1, 1, 'yes'];

client.query(sql, data)
  .then(() => {
    console.log('rsvp table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
