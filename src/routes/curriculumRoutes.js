const express = require('express');
const { getBooksByClass, getChaptersByBook, getTopicsByChapter } = require('../services/curriculumService');

const router = express.Router();

router.get('/books/:class', (req, res) => {
  res.json({ books: getBooksByClass(req.params.class) });
});

router.get('/chapters/:bookId', (req, res) => {
  res.json({ chapters: getChaptersByBook(req.params.bookId) });
});

router.get('/topics/:chapterId', (req, res) => {
  res.json({ topics: getTopicsByChapter(req.params.chapterId) });
});

module.exports = router;
