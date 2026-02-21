async function generateExplanation({ studentClass, subject, chapter, topic }) {
  return {
    explanation: `${topic} in ${chapter} (${subject} Class ${studentClass}) means understanding the concept with simple Marathi-English friendly language.`,
    example: `Example: In ${topic}, we can compare real-life objects such as pizza slices to understand parts of a whole.`,
    solvedProblem: 'If 7/4 is converted to mixed form, divide 7 by 4 => 1 remainder 3, so answer is 1 3/4.',
    keyPoints: ['Start with definition', 'Use real-world example', 'Practice 3 sums daily'],
  };
}

async function generateQuiz({ topic }) {
  return {
    topic,
    questions: [
      {
        id: 'q1',
        question: 'Convert 9/5 into mixed fraction',
        options: ['1 4/5', '2 1/5', '1 3/5', '2 4/5'],
        answer: '1 4/5',
      },
    ],
  };
}

module.exports = { generateExplanation, generateQuiz };
