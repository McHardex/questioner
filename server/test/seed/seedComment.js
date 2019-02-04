/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Client } from 'pg';

import dotenv from 'dotenv';

import connectionString from '../../config';

dotenv.config();

const sql = 'INSERT INTO comments (user_id, comment, question_id) VALUES($1,$2,$3)';

const data = [1, 'this is a new comment', 1];

const client = new Client(connectionString);
client.connect((err) => {
  if (err) {
    console.error('error connecting to database', err.stack);
  } else {
    console.log(`connected to ${connectionString}`);
  }
});

client.query(sql, data)
  .then((res) => {
    console.log('comment table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
