const { curriculum } = require('../data/curriculum');

function getBooksByClass(studentClass) {
  const classData = curriculum[String(studentClass)] || {};
  return Object.entries(classData).map(([subject, value]) => ({
    bookId: value.id,
    subject,
  }));
}

function getChaptersByBook(bookId) {
  for (const classData of Object.values(curriculum)) {
    for (const book of Object.values(classData)) {
      if (book.id === bookId) {
        return book.chapters;
      }
    }
  }
  return [];
}

function getTopicsByChapter(chapterId) {
  for (const classData of Object.values(curriculum)) {
    for (const book of Object.values(classData)) {
      const chapter = book.chapters.find((item) => item.id === chapterId);
      if (chapter) return chapter.topics;
    }
  }
  return [];
}

module.exports = { getBooksByClass, getChaptersByBook, getTopicsByChapter };
