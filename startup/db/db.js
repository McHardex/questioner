/* eslint-disable no-unused-vars */

import pg from 'pg';

import userDb from '../../models/userDb';

require('dotenv').config();

const connectionString = process.env.DB_URL;

const client = new pg.Client(connectionString);
client.connect((err) => {
  if (err) {
    /* eslint-disable no-console */
    console.error('error connecting', err.stack);
  } else {
    /* eslint-disable no-console */
    console.log(`connected to ${connectionString}`);
  }
});

client.query(userDb, (err, res) => {
  client.end();
});
