const voteDb = `
  CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL
  );
`;

export default voteDb;
