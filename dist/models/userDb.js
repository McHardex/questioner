"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var userDB = "\n  DROP TABLE IF EXISTS users CASCADE;\n  CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    firstname VARCHAR(255) NOT NULL,\n    lastname VARCHAR(255) NOT NULL,\n    othername VARCHAR(255) NOT NULL,\n    username VARCHAR(255) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    phoneNumber VARCHAR(15) NOT NULL,\n    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    isAdmin BOOLEAN DEFAULT FALSE,\n    password VARCHAR(255) NOT NULL\n  );\n";

exports.default = userDB;