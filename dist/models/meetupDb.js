"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var meetupDb = "\n  DROP TABLE IF EXISTS meetups CASCADE;\n  CREATE TABLE meetups (\n    id SERIAL PRIMARY KEY,\n    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    location VARCHAR(255) NOT NULL,\n    topic VARCHAR(255) UNIQUE NOT NULL,\n    happeningOn TIMESTAMPTZ NOT NULL,\n    Tags TEXT []\n  );\n";

exports.default = meetupDb;