const rsvpDb = `
  DROP TABLE IF EXISTS rsvps CASCADE;
  CREATE TABLE rsvps (
    id INTEGER,
    meetup_id INTEGER NOT NULL, 
    user_id INTEGER NOT NULL,
    response VARCHAR(255) NOT NULL,
    PRIMARY KEY(meetup_id, user_id)
  );
`;

export default rsvpDb;
