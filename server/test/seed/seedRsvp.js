/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Client } from 'pg';

import dotenv from 'dotenv';

import connectionString from '../../config';

dotenv.config();

require('dotenv').config();

const sql = 'INSERT INTO rsvps (id, meetup_id, user_id, response) VALUES($1,$2,$3,$4)';

const data = [1, 1, 1, 'yes'];

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
    console.log('rsvp table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
