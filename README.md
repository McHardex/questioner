[![Build Status](https://travis-ci.org/McHardex/questioner.svg?branch=master)](https://travis-ci.org/McHardex/questioner)
[![Coverage Status](https://coveralls.io/repos/github/McHardex/questioner/badge.svg)](https://coveralls.io/github/McHardex/questioner)
[![Maintainability](https://api.codeclimate.com/v1/badges/13df4ea0847c4ab6e3e1/maintainability)](https://codeclimate.com/github/McHardex/questioner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/13df4ea0847c4ab6e3e1/test_coverage)](https://codeclimate.com/github/McHardex/questioner/test_coverage)

# questioner
Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

The App is hosted on github-pages [ here ](https://mchardex.github.io/questioner/).


The endpoints are hosted on heroku [ here ](https://questioner-mchardex.herokuapp.com/api/v1/welcome).

## Made With
  ### UI
    * HTML for writing the webpage
    * CSS for styling
    * Javascript to add some behaviour
  
  ### Server
    * Nodejs for server-side logic
    * Babel for transpiling
    * Express for api routes implementation

  ### Continuous Integration
    * Travis CI & Codeclimate for test automation
    * Coveralls for test coverage report
  
  ### Test-Driven Development
    * Mocha & Chai for api route testing

## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` https://github.com/McHardex/questioner.git ```
  * Run ```npm install``` to install the required dependencies
  * Run ```npm test``` to fireup the tests
  * Navigate to http://localhost:2000/api/v1/welcome

## Features of the template
* Users can create meetup.
* Users can get meetups.
* Users can get upcoming meetups.
* Users can create questions.
* Users can get questions.
* Users can upvote and downvote favorite questions.
* Users can create RSVPs for meetups.
* Users can get all rsvps.

## Available APIs
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>API ENDPOINT/PATH</th>
      <th>ACTION</th>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/welcome</td>
      <td>Welcomes users to the application</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/meetups</td>
      <td>Allows users to create meetups</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/meetups</td>
      <td>Gets all avalaible meetups in the app</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/meetups/:meetup_id</td>
      <td>Gets one meetup in the app</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/meeetups/upcoming</td>
      <td>Get all upcoming meetups</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/questions</td>
      <td>Allows users to ask questions on meetups</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/questions</td>
      <td>Get all questions in the app</td>
  </tr>
  <tr>
      <td>PATCH</td>
      <td>/api/v1/questions/:question_id/upvote</td>
      <td>upvote and questions</td>
  </tr>
  <tr>
      <td>PATCH</td>
      <td>/api/v1/questions/:question_id/downvote</td>
      <td>downvote and questions</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/meetups/:meetup_id/rsvps</td>
      <td>Allows users to create rsvps for meetups</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/rsvps</td>
      <td>Get all RSVPs in the app</td>
  </tr>
</table>
