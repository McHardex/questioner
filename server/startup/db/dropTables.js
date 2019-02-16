/* eslint-disable import/named */
/* eslint-disable no-console */

import { client } from '../../config';

client.query('DROP TABLE IF EXISTS users CASCADE')
  .then(() => {
    console.log('user table dropped');
  })
  .catch((err) => {
    console.log('unable to drop user table', err);
    client.end();
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS meetups CASCADE')
      .then(() => {
        console.log('meetup table dropped');
      })
      .catch((err) => {
        console.log('unable to drop meetup table', err);
        client.end();
      });
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS asknow CASCADE')
      .then(() => {
        console.log('question table dropped');
      })
      .catch((err) => {
        console.log('unable to drop question table', err);
        client.end();
      });
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS comments CASCADE')
      .then(() => {
        console.log('comments table dropped');
      })
      .catch((err) => {
        console.log('unable to drop comments table', err);
        client.end();
      });
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS votes CASCADE')
      .then(() => {
        console.log('votes table dropped');
      })
      .catch((err) => {
        console.log('unable to drop votes table', err);
        client.end();
      });
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS rsvps CASCADE')
      .then(() => {
        console.log('rsvp table dropped');
        client.end();
      })
      .catch((err) => {
        console.log('unable to drop rsvp table', err);
        client.end();
      });
  });
