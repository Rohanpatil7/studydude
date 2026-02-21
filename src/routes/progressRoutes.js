const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { getDashboard } = require('../services/progressService');

const router = express.Router();
router.use(authenticate);

router.get('/dashboard', (req, res) => {
  res.json({ dashboard: getDashboard(req.user.sub) });
});

module.exports = router;
