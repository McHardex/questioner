'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _MeetupController = require('../controllers/MeetupController');

var _MeetupController2 = _interopRequireDefault(_MeetupController);

var _QuestionController = require('../controllers/QuestionController');

var _QuestionController2 = _interopRequireDefault(_QuestionController);

var _RsvpController = require('../controllers/RsvpController');

var _RsvpController2 = _interopRequireDefault(_RsvpController);

var _WelcomeController = require('../controllers/WelcomeController');

var _WelcomeController2 = _interopRequireDefault(_WelcomeController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _CommentController = require('../controllers/CommentController');

var _CommentController2 = _interopRequireDefault(_CommentController);

var _meetupValidations = require('../middlewares/validations/meetupValidations');

var _meetupValidations2 = _interopRequireDefault(_meetupValidations);

var _questionValidations = require('../middlewares/validations/questionValidations');

var _questionValidations2 = _interopRequireDefault(_questionValidations);

var _signupValidation = require('../middlewares/validations/signupValidation');

var _signupValidation2 = _interopRequireDefault(_signupValidation);

var _loginValidation = require('../middlewares/validations/loginValidation');

var _loginValidation2 = _interopRequireDefault(_loginValidation);

var _commentValidation = require('../middlewares/validations/commentValidation');

var _commentValidation2 = _interopRequireDefault(_commentValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Welcome endpoint


// validations
router.get('/welcome', _WelcomeController2.default.welcome);

// create user account
router.post('/auth/signup', _signupValidation2.default, _userController2.default.signUp);

// login to account
router.post('/auth/login', _loginValidation2.default, _userController2.default.login);

// Meetup endpoints
router.get('/meetups', _auth2.default, _MeetupController2.default.getAllMeetups);
router.get('/meetups/upcoming', _auth2.default, _MeetupController2.default.upcomingMeetups);
router.get('/meetups/:id', _auth2.default, _MeetupController2.default.getSpecificMeetupRecord);
router.post('/meetups', _auth2.default, _meetupValidations2.default, _MeetupController2.default.createMeetup);
router.delete('/meetups/:id', _auth2.default, _MeetupController2.default.deleteMeetup);
router.put('/meetups/:id', _auth2.default, _meetupValidations2.default, _MeetupController2.default.updateMeetup);

// Question endpoints
router.get('/questions', _auth2.default, _QuestionController2.default.getAllQuestions);
router.post('/questions', _auth2.default, _questionValidations2.default, _QuestionController2.default.createQuestion);
router.patch('/questions/:question_id/upvote', _auth2.default, _QuestionController2.default.upvoteQuestion);
router.patch('/questions/:question_id/downvote', _auth2.default, _QuestionController2.default.downvoteQuestion);
router.post('/comments', _auth2.default, _commentValidation2.default, _CommentController2.default.comment);

// Rsvp enpoints
router.get('/rsvps', _auth2.default, _RsvpController2.default.getAllRsvps);
router.post('/meetups/:meetup_id/rsvps', _auth2.default, _RsvpController2.default.createRsvp);

exports.default = router;