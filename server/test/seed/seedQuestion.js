/* eslint-disable no-console */
/* eslint-disable import/named */

import moment from 'moment';

import { client } from '../../config';

const sql = 'INSERT INTO asknow (createdOn, createdBy, meetup_id, title, body, votes) VALUES($1,$2,$3,$4,$5,$6)';

const data = [moment(new Date()), 1, 1, 'what have you learnt so far?', 'Tolerance, adaptability, collaboration, time management', 1];

client.query(sql, data)
  .then(() => {
    console.log('question table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
