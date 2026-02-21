const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const learningRoutes = require('./routes/learningRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');
const progressRoutes = require('./routes/progressRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandlers');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'studydude-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api', curriculumRoutes);
app.use('/api/learn', learningRoutes);
app.use('/api/progress', progressRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
