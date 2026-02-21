const { cache, progress } = require('../data/stores');
const { generateExplanation, generateQuiz } = require('./aiService');

function buildExplainCacheKey(payload) {
  return `explain:${payload.studentClass}:${payload.subject}:${payload.chapter}:${payload.topic}`;
}

async function explainTopic(userId, payload) {
  const cacheKey = buildExplainCacheKey(payload);
  if (cache.has(cacheKey)) {
    return { source: 'cache', data: cache.get(cacheKey) };
  }

  const explanation = await generateExplanation(payload);
  cache.set(cacheKey, explanation);

  const logs = progress.get(userId) || [];
  logs.push({ type: 'topic_access', at: new Date().toISOString(), ...payload });
  progress.set(userId, logs);

  return { source: 'ai', data: explanation };
}

async function generateTopicQuiz(payload) {
  const cacheKey = `quiz:${payload.topic}`;
  if (cache.has(cacheKey)) {
    return { source: 'cache', data: cache.get(cacheKey) };
  }

  const quiz = await generateQuiz(payload);
  cache.set(cacheKey, quiz);
  return { source: 'ai', data: quiz };
}

function submitQuiz(userId, submission) {
  const logs = progress.get(userId) || [];
  logs.push({ type: 'quiz_submission', at: new Date().toISOString(), ...submission });
  progress.set(userId, logs);
  return { saved: true };
}

module.exports = { explainTopic, generateTopicQuiz, submitQuiz };
