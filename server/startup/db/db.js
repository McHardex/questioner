/* eslint-disable import/named */
/* eslint-disable no-console */

import userDb from '../../models/userDb';

import questionDb from '../../models/questionDb';

import rsvpDB from '../../models/rsvpDb';

import meetupDb from '../../models/meetupDb';

import commentDb from '../../models/commentDb';

import voteDb from '../../models/voteDb';

import { client } from '../../config';

const createQuery = (query) => {
  client.query(query)
    .then(() => {
      console.log('tables created successfully');
      client.end();
    })
    .catch((err) => {
      console.log(err, 'error creating tables');
      client.end();
    });
};

createQuery(`${userDb}${meetupDb}${questionDb}${commentDb}${rsvpDB}${voteDb}`);
