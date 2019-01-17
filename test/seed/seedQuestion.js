/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Client } from 'pg';

import dotenv from 'dotenv';

import moment from 'moment';

import connectionString from '../../config';


dotenv.config();

const sql = 'INSERT INTO asknow (createdOn, createdBy, meetup_id, title, body, votes) VALUES($1,$2,$3,$4,$5,$6)';

const data = [moment(new Date()), 1, 1, 'what have you learnt so far?', 'Tolerance, adaptability, collaboration, time management', 2];

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
    console.log('question table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
