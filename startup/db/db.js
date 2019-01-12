require('dotenv').config();
import { Pool } from 'pg';
const connectionString = process.env.DB_URL;
import userDb from '../../models/userDb';

const pool = new Pool(connectionString);
pool.on('connect', () => {
  console.log(`connected to ${connectionString}`);
});

pool.query(`${userDb}`)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  })
