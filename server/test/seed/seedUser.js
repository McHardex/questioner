/* eslint-disable no-console */
/* eslint-disable import/named */

import bcrypt from 'bcrypt';

import { client } from '../../config';

const hashedPassword = bcrypt.hashSync('password', 10);

const sql = `INSERT INTO
users (firstname, lastname, othername, username, phoneNumber, email, password, isAdmin)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

const data1 = ['bukunmi', 'adebisi', 'joseph', 'mchardex', '08160601644', 'bukunm@gmail.com', hashedPassword, true];

const data2 = ['olawale', 'Afosi', 'muideen', 'marquez', '12345677888999', 'davedfdfd@gmail.com', hashedPassword, false];


client.query(sql, data1)
  .then(() => {
    console.log('user 1 populated');
  })
  .then(() => {
    client.query(sql, data2)
      .then(() => {
        console.log('user 2 populated');
        client.end();
      })
      .catch((err) => {
        console.log(err, 'error creating user table');
        client.end();
      });
  })
  .catch((err) => {
    console.log(err, 'error creating user table');
    client.end();
  });
