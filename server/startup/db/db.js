/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Client } from 'pg';

import dotenv from 'dotenv';

import userDb from '../../models/userDb';

import questionDb from '../../models/questionDb';

import rsvpDB from '../../models/rsvpDb';

import meetupDb from '../../models/meetupDb';

import connectionString from '../../config';

dotenv.config();

const client = new Client(connectionString);

const createQuery = (query) => {
  client.connect((err) => {
    if (err) {
      console.error('error connecting to database', err.message);
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
};

createQuery(`${userDb}${meetupDb}${questionDb}${rsvpDB}`);
