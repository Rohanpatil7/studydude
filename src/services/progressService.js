const { progress } = require('../data/stores');

function getDashboard(userId) {
  const logs = progress.get(userId) || [];
  const topicsVisited = logs.filter((entry) => entry.type === 'topic_access').length;
  const quizzesSubmitted = logs.filter((entry) => entry.type === 'quiz_submission').length;

  return {
    topicsVisited,
    quizzesSubmitted,
    recentActivity: logs.slice(-10).reverse(),
  };
}

module.exports = { getDashboard };
