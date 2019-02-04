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

client.connect()
  .then(() => {
    client2.connect();
  })
  .catch((err) => {
    throw new Error(err);
  });

client.query(sql, data1)
  .then((res) => {
    console.log('user 1 populated');
    client.end();
  })
  .then(() => {
    client2.query(sql, data2)
      .then((res) => {
        console.log('user 2 populated');
        client2.end();
      })
      .catch((err) => {
        console.log(err, 'error creating user table');
        client2.end();
      });
  })
  .catch((err) => {
    console.log(err, 'error creating user table');
    client.end();
  });
