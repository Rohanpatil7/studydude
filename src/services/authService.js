const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { users } = require('../data/stores');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

async function register({ name, email, password, studentClass, board = 'Maharashtra' }) {
  if (users.has(email)) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `usr_${crypto.randomUUID()}`,
    name,
    email,
    passwordHash,
    class: studentClass,
    board,
    subscriptionType: 'free',
    createdAt: new Date().toISOString(),
  };

  users.set(email, user);
  return sanitizeUser(user);
}

async function login({ email, password }) {
  const user = users.get(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      class: user.class,
      subscriptionType: user.subscriptionType,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn },
  );

  return { token, user: sanitizeUser(user) };
}

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

module.exports = { register, login };
