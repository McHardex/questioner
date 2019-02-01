/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Client } from 'pg';

import dotenv from 'dotenv';

import moment from 'moment';

import connectionString from '../../config';

dotenv.config();

const sql = 'INSERT INTO meetups (topic, location, happeningOn, tags) VALUES($1,$2,$3,$4)';

const data = ['excellence archievers', 'ajegunle', moment(new Date()), ['bukunmi', 'sola', 'ola']];

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
    console.log('meetup table populated');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
