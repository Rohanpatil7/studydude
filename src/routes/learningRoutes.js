const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { explainTopic, generateTopicQuiz, submitQuiz } = require('../services/learningService');

const router = express.Router();

router.use(authenticate);

router.post('/explain', async (req, res, next) => {
  try {
    const result = await explainTopic(req.user.sub, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/quiz', async (req, res, next) => {
  try {
    const result = await generateTopicQuiz(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/submit', (req, res, next) => {
  try {
    const result = submitQuiz(req.user.sub, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
