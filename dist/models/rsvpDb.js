"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rsvpDb = "\n  DROP TABLE IF EXISTS rsvps CASCADE;\n  CREATE TABLE rsvps (\n    id SERIAL NOT NULL,\n    meetup_id INTEGER UNIQUE NOT NULL, \n    user_id INTEGER NOT NULL,\n    response VARCHAR(6) NOT NULL,\n    PRIMARY KEY(id, meetup_id, user_id)\n  );\n";

exports.default = rsvpDb;