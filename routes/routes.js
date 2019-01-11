import express from 'express';

import MeetupController from '../controller/MeetupController';
import QuestionController from '../controller/QuestionController';
import RsvpController from '../controller/RsvpController';
import WelcomeController from '../controller/WelcomeController';

// validations
import * as validate from '../middlewares/validations/meetupValidations';
import * as validation from '../middlewares/validations/questionValidations';
import createRsvpValidation from '../middlewares/validations/rsvpValidations';

const router = express.Router();

// Welcome endpoint
router.get('/welcome', WelcomeController.welcome);

// Meetup endpoints
router.get('/meetups', MeetupController.getAllMeetups);
router.get('/meetups/upcoming', validate.upcomingMeetups, MeetupController.upcomingMeetups);
router.get('/meetups/:id', validate.specificMeetup, MeetupController.getSpecificMeetupRecord);
router.post('/meetups', validate.createMeetup, MeetupController.createMeetup);

// Question endpoints
router.get('/questions', QuestionController.getAllQuestions);
router.post('/questions', validation.createQuestion,
  QuestionController.createQuestion);
router.patch('/questions/:question_id/upvote', validation.upvoteQuestion,
  QuestionController.upvoteQuestion);
router.patch('/questions/:question_id/downvote', validation.downvoteQuestion,
  QuestionController.downvoteQuestion);

// Rsvp enpoints
router.get('/rsvps', RsvpController.getAllRsvps);
router.post('/meetups/:meetup_id/rsvps', createRsvpValidation, RsvpController.createRsvp);

export default router;
