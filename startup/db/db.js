import { Pool } from 'pg';

import userDb from '../../models/userDb';

require('dotenv').config();

const connectionString = process.env.DB_URL;

const pool = new Pool(connectionString);

pool.on('connect', () => {
  /* eslint-disable no-console */
  console.log(`connected to ${connectionString}`);
});

pool.query(`${userDb}`)
  .then((res) => {
    /* eslint-disable no-console */
    console.log('schmas ready', res);
  })
  .catch((err) => {
    /* eslint-disable no-console */
    console.log(err);
    pool.end();
  });
