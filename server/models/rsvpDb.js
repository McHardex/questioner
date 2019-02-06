const rsvpDb = `
  CREATE TABLE rsvps (
    id SERIAL NOT NULL,
    meetup_id INTEGER NOT NULL, 
    user_id INTEGER NOT NULL,
    response VARCHAR(6) NOT NULL,
    PRIMARY KEY(meetup_id, user_id)
  );
`;

export default rsvpDb;
