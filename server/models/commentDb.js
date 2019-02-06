const commentDb = `
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    comment VARCHAR(200) NOT NULL,
    question_id INTEGER REFERENCES asknow (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export default commentDb;
