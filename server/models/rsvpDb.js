const rsvpDb = `
  DROP TABLE IF EXISTS rsvps CASCADE;
  CREATE TABLE rsvps (
    id SERIAL NOT NULL,
    meetup_id INTEGER UNIQUE NOT NULL, 
    user_id INTEGER NOT NULL,
    response VARCHAR(6) NOT NULL,
    PRIMARY KEY(id, meetup_id, user_id)
  );
`;

export default rsvpDb;
