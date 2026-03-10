// const questionData = [
//   {
//     type: 'multiple',
//     difficulty: 'easy',
//     category: 'Science: Mathematics',
//     question: 'What type of angle is greater than 90&deg;?',
//     correct_answer: 'Obtuse',
//     incorrect_answers: ['Acute', 'Right', 'Straight'],
//   },
//   {
//     type: 'multiple',
//     difficulty: 'easy',
//     category: 'Science: Mathematics',
//     question: 'What is the symbol for Displacement?',
//     correct_answer: '&Delta;r',
//     incorrect_answers: ['dr', 'Dp', 'r'],
//   },
//   {
//     type: 'multiple',
//     difficulty: 'easy',
//     category: 'Science: Mathematics',
//     question: 'How many sides does a heptagon have?',
//     correct_answer: '7',
//     incorrect_answers: ['5', '4', '9'],
//   },
//   {
//     type: 'multiple',
//     difficulty: 'easy',
//     category: 'Science: Mathematics',
//     question: 'How many sides does a pentagon have?',
//     correct_answer: '5',
//     incorrect_answers: ['9', '6', '4'],
//   },
//   {
//     type: 'multiple',
//     difficulty: 'easy',
//     category: 'Science: Mathematics',
//     question: 'What prime number comes next after 19?',
//     correct_answer: '23',
//     incorrect_answers: ['25', '21', '27'],
//   },
// ];

// console.log();

function formatQuestions(data) {
  const newQuestionArray = [];

  const optionsArr = ['a', 'b', 'c', 'd'];

  for (let question of data) {
    const n = Math.floor(Math.random() * 4);

    const newQuestionObject = {};

    newQuestionObject.question_prompt = question.question;
    newQuestionObject.correct_option = optionsArr[n];
    newQuestionObject[`option_${optionsArr[n]}`] = question.correct_answer;
    newQuestionObject[`option_${optionsArr[(n + 1) % 4]}`] = question.incorrect_answers[0];
    newQuestionObject[`option_${optionsArr[(n + 2) % 4]}`] = question.incorrect_answers[1];
    newQuestionObject[`option_${optionsArr[(n + 3) % 4]}`] = question.incorrect_answers[2];

    newQuestionObject.difficulty = question.difficulty;
    newQuestionObject.category = question.category;

    newQuestionArray.push(newQuestionObject);
  }

  return newQuestionArray;
}

// console.log(formatQuestions(questionData));

module.exports = formatQuestions;
