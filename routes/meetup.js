import express from 'express';

import MeetupController from '../controller/MeetupController';

const router = express.Router();

router.get('/meetups', MeetupController.getAllMeetups);

router.get('/meetups/upcoming', MeetupController.upcomingMeetups);

router.get('/meetups/:id', MeetupController.getSpecificMeetupRecord);

router.post('/meetups', MeetupController.createMeetup);

export default router;
