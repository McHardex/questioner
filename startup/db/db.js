/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import pg from 'pg';

import userDb from '../../models/userDb';

import questionDb from '../../models/questionDb';

import commentDb from '../../models/commentDb';

import meetupDb from '../../models/meetupDb';

require('dotenv').config();

const connectionString = process.env.DB_URL;

function createQuery(query) {
  const client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) {
      console.error('error connecting to database', err.stack);
    } else {
      console.log(`connected to ${connectionString}`);
    }
  });

  client.query(query)
    .then((res) => {
      console.log('tables created successfully');
      client.end();
    })
    .catch((err) => {
      console.log(err, 'error creating tables');
      client.end();
    });
}

createQuery(`${userDb}${meetupDb}${questionDb}${commentDb}`);
