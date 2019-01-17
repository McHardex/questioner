import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DB_URL,
  test: process.env.TEST_DB,
};

let setConnectionString;
if (process.env.NODE_ENV === 'test') {
  setConnectionString = config.test;
} else {
  setConnectionString = config.development;
}

const connectionString = setConnectionString;
export default connectionString;
