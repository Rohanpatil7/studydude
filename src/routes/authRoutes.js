const express = require('express');
const { register, login } = require('../services/authService');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, studentClass } = req.body;
    const user = await register({ name, email, password, studentClass });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await login({ email, password });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
