/* eslint-disable consistent-return */

class WelcomeController {
  /**
   * @description - Get all offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
  */

  static welcome(req, res) {
    const data = {
      message: 'Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.',
      endpoints: {
        signup: 'POST /api/v1/auth/signup',
        login: 'POST /api/v1/auth/login',
        createMeetup: 'POST /api/v1/meetups',
        updateMeetup: 'PUT /api/v1/meetups/:id',
        deleteMeetup: 'POST /api/v1//meetups/:id',
        getAllMeetups: 'GET /api/v1/meetups',
        getOneMeetup: 'GET /api/v1/meetups/:meetup_id',
        getUpcomingMeetups: 'GET /api/v1/meetups/upcoming',
        getAllQuestions: 'GET /api/v1/questions',
        createQuestion: 'POST /api/v1/questions',
        upvoteQuestion: 'PATCH /api/v1/questions/:question_id/upvote',
        getAllRsvps: 'GET /api/v1/rsvps',
        createRsvp: 'POST /api/v1/meetups/:meetup_id/rsvps',
      },
    };
    res.status(200).json({ status: 200, data });
  }
}

export default WelcomeController;
