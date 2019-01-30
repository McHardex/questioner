const commentDb = `
  DROP TABLE IF EXISTS comments CASCADE;
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(200) NOT NULL,
    question_id INTEGER REFERENCES asknow (id)
  );
`;

export default commentDb;
