import express from 'express';
import QuestionController from '../controller/QuestionController';

const router = express.Router();

router.get('/questions', QuestionController.getAllQuestions);

router.post('/questions', QuestionController.createQuestion);

router.patch('/questions/:question_id/upvote', QuestionController.upvoteQuestion);

router.patch('/questions/:question_id/downvote', QuestionController.downvoteQuestion);

export default router;
