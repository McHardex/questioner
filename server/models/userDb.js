const userDB = `
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    othername VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(15),
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isAdmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255)
  );
`;

export default userDB;
