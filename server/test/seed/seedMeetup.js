/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Client } from 'pg';

import dotenv from 'dotenv';

import moment from 'moment';

import connectionString from '../../config';

dotenv.config();

const sql = 'INSERT INTO meetups (topic, location, happeningOn, tags) VALUES($1,$2,$3,$4)';

const data1 = ['excellence archievers', 'ajegunle', moment(new Date()), ['bukunmi', 'sola', 'ola']];
const data2 = ['excellence newbie', 'lagos', moment(new Date('12-12-2990')), ['ola', 'sola', 'bale']];

const client1 = new Client(connectionString);
const client2 = new Client(connectionString);
client1.connect();
client2.connect();

client1.query(sql, data1)
  .then((res) => {
    console.log('meetup table 1 populated');
    client1.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client1.end();
  });

client2.query(sql, data2)
  .then((res) => {
    console.log('meetup table 2 populated');
    client2.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client2.end();
  });
