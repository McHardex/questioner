'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable consistent-return */

var WelcomeController = function () {
  function WelcomeController() {
    _classCallCheck(this, WelcomeController);
  }

  _createClass(WelcomeController, null, [{
    key: 'welcome',

    /**
     * @description - Get all offers
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json}
    */

    value: function welcome(req, res) {
      var data = {
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
          downvoteQuestion: 'PATCH /api/v1/questions/:question_id/downvote',
          getAllRsvps: 'GET /api/v1/rsvps',
          createRsvp: 'POST /api/v1/meetups/:meetup_id/rsvps'
        }
      };
      res.status(200).json({ status: 200, data: data });
    }
  }]);

  return WelcomeController;
}();

exports.default = WelcomeController;