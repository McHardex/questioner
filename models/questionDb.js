const questionDb = `
  DROP TABLE IF EXISTS questions CASCADE;
  CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy INTEGER,
    meetup_id INTEGER NOT NULL, 
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    votes INTEGER,
    FOREIGN KEY (createdBy) REFERENCES users (id),
    FOREIGN KEY (meetup_id) REFERENCES meetups (id)
  );
`;

export default questionDb;
