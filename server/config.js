/* eslint-disable no-console */

import { Client } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DB_URL,
  test: process.env.TEST_DB,
  production: process.env.DATABASE_URL,
};

let setConnectionString;
if (process.env.NODE_ENV === 'test') {
  setConnectionString = config.test;
} else if (process.env.NODE_ENV === 'production') {
  setConnectionString = config.production;
} else {
  setConnectionString = config.development;
}

const connectionString = setConnectionString;

const client = new Client(connectionString);
client.connect((err) => {
  if (err) {
    console.error(`error connecting to ${connectionString}`, err.message);
    client.end();
  } else {
    console.log(`connected to ${connectionString}`);
  }
});

exports.client = client;
