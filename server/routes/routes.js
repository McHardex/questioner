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
import createQuestion from '../middlewares/validations/questionValidations';
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
router.get('/meetups/upcoming', auth, MeetupController.upcomingMeetups);
router.get('/meetups/:id', auth, MeetupController.getSpecificMeetupRecord);
router.post('/meetups', auth, createMeetupValidation, MeetupController.createMeetup);
router.delete('/meetups/:id', auth, MeetupController.deleteMeetup);
router.put('/meetups/:id', auth, MeetupController.updateMeetup);

// Question endpoints
router.get('/questions', auth, QuestionController.getAllQuestions);
router.post('/questions', auth, createQuestion, QuestionController.createQuestion);
router.patch('/questions/:question_id/upvote', auth, QuestionController.upvoteQuestion);
router.patch('/questions/:question_id/downvote', auth, QuestionController.downvoteQuestion);
router.post('/comments', auth, commentValid, CommentController.comment);
router.get('/comments', auth, CommentController.getAllComments);
router.get('/comments/:user_id', CommentController.getSpecificUserComment);

// Rsvp enpoints
router.get('/rsvps', auth, RsvpController.getAllRsvps);
router.post('/meetups/:meetup_id/rsvps', auth, RsvpController.createRsvp);

export default router;
