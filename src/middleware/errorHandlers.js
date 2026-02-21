function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message || 'Internal server error',
  });
}

module.exports = { notFoundHandler, errorHandler };
