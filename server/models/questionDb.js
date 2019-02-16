const questionDb = `
  CREATE TABLE asknow (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy INTEGER,
    meetup_id INTEGER NOT NULL, 
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    votes INTEGER DEFAULT 0 CHECK (votes >= 0),
    FOREIGN KEY (createdBy) REFERENCES users (id),
    FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export default questionDb;
