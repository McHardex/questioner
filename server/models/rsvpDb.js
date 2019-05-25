const rsvpDb = `
  CREATE TABLE rsvps (
    id SERIAL NOT NULL,
    meetup_id INTEGER NOT NULL, 
    user_id INTEGER NOT NULL,
    response VARCHAR(6) NOT NULL
  );
`;

export default rsvpDb;
