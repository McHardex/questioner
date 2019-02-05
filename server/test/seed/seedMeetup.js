/* eslint-disable import/named */
/* eslint-disable no-console */

import moment from 'moment';

import { client } from '../../config';

const sql = 'INSERT INTO meetups (topic, location, happeningOn, tags) VALUES($1,$2,$3,$4)';

const data1 = ['excellence archievers', 'ajegunle', moment(new Date()), ['bukunmi', 'sola', 'ola']];
const data2 = ['excellence newbie', 'lagos', moment(new Date('12-12-2990')), ['ola', 'sola', 'bale']];

client.query(sql, data1)
  .then(() => {
    console.log('meetup table 1 populated');
  })
  .then(() => {
    client.query(sql, data2)
      .then(() => {
        console.log('meetup table 2 populated');
        client.end();
      })
      .catch((err) => {
        console.log(err, 'error creating tables');
        client.end();
      });
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
