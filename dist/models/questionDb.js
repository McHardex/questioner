"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var questionDb = "\n  DROP TABLE IF EXISTS asknow CASCADE;\n  CREATE TABLE asknow (\n    id SERIAL PRIMARY KEY,\n    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    createdBy INTEGER,\n    meetup_id INTEGER NOT NULL, \n    title VARCHAR(255) NOT NULL,\n    body VARCHAR(255) NOT NULL,\n    votes INTEGER DEFAULT 0,\n    FOREIGN KEY (createdBy) REFERENCES users (id),\n    FOREIGN KEY (meetup_id) REFERENCES meetups (id)\n  );\n";

exports.default = questionDb;