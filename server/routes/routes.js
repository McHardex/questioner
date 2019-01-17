import express from 'express';

import auth from '../middlewares/auth';

import MeetupController from '../controllers/MeetupController';
import QuestionController from '../controllers/QuestionController';
import RsvpController from '../controllers/RsvpController';
import WelcomeController from '../controllers/WelcomeController';
import UserController from '../controllers/userController';
import CommentController from '../controllers/CommentController';

// validations
import createMeetupValidation from '../middlewares/validations/meetupValidations';
import * as validation from '../middlewares/validations/questionValidations';
import createRsvpValidation from '../middlewares/validations/rsvpValidations';
import signupValidation from '../middlewares/validations/signupValidation';
import loginValidation from '../middlewares/validations/loginValidation';
import commentValid from '../middlewares/validations/commentValidation';

const router = express.Router();

// Welcome endpoint
router.get('/welcome', WelcomeController.welcome);

// create user account
router.post('/auth/signup', signupValidation, UserController.signUp);

// login to account
router.post('/auth/login', loginValidation, UserController.login);

// Meetup endpoints
router.get('/meetups', auth, MeetupController.getAllMeetups);
router.get('/meetups/upcoming', MeetupController.upcomingMeetups);
router.get('/meetups/:id', auth, MeetupController.getSpecificMeetupRecord);
router.post('/meetups', auth, createMeetupValidation, MeetupController.createMeetup);
router.delete('/meetups/:id', auth, MeetupController.deleteMeetup);
router.put('/meetups/:id', auth, createMeetupValidation, MeetupController.updateMeetup);

// Question endpoints
router.get('/questions', QuestionController.getAllQuestions);
router.post('/questions', auth, validation.createQuestion,
  QuestionController.createQuestion);
router.patch('/questions/:question_id/upvote', auth, validation.upvoteQuestion,
  QuestionController.upvoteQuestion);
router.patch('/questions/:question_id/downvote', auth, validation.downvoteQuestion,
  QuestionController.downvoteQuestion);
router.post('/comments', auth, commentValid, CommentController.comment);

// Rsvp enpoints
router.get('/rsvps', RsvpController.getAllRsvps);
router.post('/meetups/:meetup_id/rsvps', createRsvpValidation, RsvpController.createRsvp);

export default router;
