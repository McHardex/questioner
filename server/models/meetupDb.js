const meetupDb = `
  DROP TABLE IF EXISTS meetups CASCADE;
  CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255) NOT NULL,
    topic VARCHAR(255) UNIQUE NOT NULL,
    happeningOn TIMESTAMPTZ NOT NULL,
    Tags TEXT []
  );
`;

export default meetupDb;
