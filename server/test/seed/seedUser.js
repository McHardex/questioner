/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import pg from 'pg';

import bcrypt from 'bcrypt';

import connectionString from '../../config';

require('dotenv').config();

// seed user to database
const hashedPassword = bcrypt.hashSync('password', 10);

const sql = `INSERT INTO
users (firstname, lastname, othername, username, phoneNumber, email, password, isAdmin)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

const data1 = ['bukunmi', 'adebisi', 'joseph', 'mchardex', '08160601644', 'bukunm@gmail.com', hashedPassword, true];

const data2 = ['olawale', 'Afosi', 'muideen', 'marquez', '12345677888999', 'davedfdfd@gmail.com', hashedPassword, false];

const client = new pg.Client(connectionString);

const client2 = new pg.Client(connectionString);

client.connect();
client2.connect();

client.query(sql, data1, (err) => {
  if (err) {
    client.end();
    console.log(err.stack);
  } else {
    client.end();
    console.log('user1 inserted');
  }
});

client2.query(sql, data2, (err) => {
  if (err) {
    client2.end();
    console.log(err.stack);
  } else {
    client2.end();
    console.log('user2 inserted');
  }
});


// seed meetup to database
const client3 = new pg.Client(connectionString);
const meetup = 'INSERT INTO meetups (topic, location, happeningOn, tags) VALUES($1,$2,$3,$4)';

const data = ['excellence archievers commitee', 'ajegunle', '2018-07-27', ['bukunmi', 'sola', 'ola']];

client3.query(meetup, data)
  .then((res) => {
    console.log('tables created successfully');
    client.end();
  })
  .catch((err) => {
    console.log(err, 'error creating tables');
    client.end();
  });
