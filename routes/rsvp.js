import express from 'express';
import RsvpController from '../controller/RsvpController';

const router = express.Router();

router.get('/rsvps', RsvpController.getAllRsvps);

router.post('/meetups/:meetup_id/rsvps', RsvpController.createRsvp);

export default router;
