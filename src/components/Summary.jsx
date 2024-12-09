import quizCompleteImg from '../assets/quiz-complete.png'
import {QuizContext} from "../contexts/QuizContextProvider.jsx";
import QUESTIONS from "../questions.js";
import {useContext} from "react";

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
    } else if (answers[i] === QUESTIONS[i].answers[0]) {
      correct += 1;
    } else {
      wrong += 1;
    }
  }

  const skippedPercentage = toPercentage(skipped/QUESTIONS.length);
  const correctPercentage = toPercentage(correct/QUESTIONS.length);
  const wrongPercentage = toPercentage(wrong/QUESTIONS.length);

  return [skippedPercentage, correctPercentage, wrongPercentage];
}

export default function Summary() {
  const {userAnswers} = useContext(QuizContext);
  const [skipped, correct, wrong] = derivePercentages(userAnswers);

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
        {userAnswers.map((answer, idx) => {
          let klass;
          if (answer === null) {
            klass = 'skipped';
          } else if (answer === QUESTIONS[idx].answers[0]) {
            klass = 'correct';
          } else {
            klass = 'wrong';
          }

          let answerText = answer;
          if (answer === null) {
            answerText = 'Not answered';
          }

          return <li key={idx}>
            <h3>{idx + 1}</h3>
            <p className="question">{QUESTIONS[idx].text}</p>
            <p className={`user-answer ${klass}`}>{answerText}</p>
          </li>
          }
        )}
      </ol>
    </div>
  );
}