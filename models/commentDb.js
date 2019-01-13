const commentDb = `
  DROP TABLE IF EXISTS comments CASCADE;
  CREATE TABLE comments (
    question_id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    body VARCHAR(255),
    comment VARCHAR(255) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT
  );
`;

export default commentDb;
