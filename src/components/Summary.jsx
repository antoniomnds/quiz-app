import quizCompleteImg from '../assets/quiz-complete.png'
import {correctAnswers} from "../contexts/QuizContextProvider.jsx";
import questions from "../questions.js";

function toPercentage(ratio) {
  return `${(ratio * 100).toFixed(0)}%`;
}

function derivePercentages(answers) {
  let skipped = 0;
  let correct = 0;
  let wrong = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === null) {
      skipped += 1;
    } else if (answers[i] === correctAnswers[i]) {
      correct += 1;
    } else {
      wrong += 1;
    }
  }

  const skippedPercentage = toPercentage(skipped/correctAnswers.length);
  const correctPercentage = toPercentage(correct/correctAnswers.length);
  const wrongPercentage = toPercentage(wrong/correctAnswers.length);

  return [skippedPercentage, correctPercentage, wrongPercentage];
}

export default function Summary({answers}) {
  const [skipped, correct, wrong] = derivePercentages(answers);

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="A trophy"/>
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skipped}</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correct}</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{wrong}</span>
          <span className="text">Wrong</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, idx) => {
          let klass;
          if (answer === null) {
            klass = 'skipped';
          } else if (answer === correctAnswers[idx]) {
            klass = 'correct';
          } else {
            klass = 'wrong';
          }

          let answerText = 'Not answered';
          if (answer !== null) {
            answerText = questions[idx].answers[answer];
          }

          return <li key={idx}>
            <h3>{idx + 1}</h3>
            <p className="question">{questions[idx].text}</p>
            <p className={`user-answer ${klass}`}>{answerText}</p>
          </li>
          }
        )}
      </ol>
    </div>
  );
}