/* eslint-disable consistent-return */

import express from 'express';

const router = express.Router();

// Welcome message route
router.get('/', (req, res) => {
  const rootMessage = {
    message: 'Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.',
    endpoints: {
      createMeetup: 'POST /api/v1/meetups',
      getAllMeetups: 'GET /api/v1/meetups',
      getOneMeetup: 'GET /api/v1/meetups/:meetup_id',
      getUpcomingMeetups: 'GET /api/v1/meeetups/upcoming',
      getAllQuestions: 'GET /api/v1/questions',
      createQuestion: 'POST /api/v1/questions',
      upvoteQuestion: 'PATCH /api/v1/questions/:question_id/upvote',
      downvoteQuestion: 'PATCH /api/v1/questions/:question_id/downvote',
      getAllRsvps: 'GET /api/v1/rsvps',
      createRsvp: 'POST /api/v1/meetups/:meetup_id/rsvps',
    },
  };
  res.status(200).json(rootMessage);
});

export default router;
