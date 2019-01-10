import express from 'express';

import MeetupController from '../controller/MeetupController';

import validateCreateMeetup from '../validations/createMeetup';

const router = express.Router();

router.get('/meetups', MeetupController.getAllMeetups);

router.get('/meetups/upcoming', MeetupController.upcomingMeetups);

router.get('/meetups/:id', MeetupController.getSpecificMeetupRecord);

router.post('/meetups', validateCreateMeetup, MeetupController.createMeetup);

export default router;
