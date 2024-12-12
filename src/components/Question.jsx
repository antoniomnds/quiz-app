import QuestionTimer from "./QuestionTimer.jsx";
import {useState} from "react";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";

export default function Question({activeQuestionIdx, onSelectAnswer, onSkipAnswer}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[activeQuestionIdx].answers[0]
      });

      setTimeout(() => {
        setAnswer({
          selectedAnswer: '',
          isCorrect: null
        });
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';
  if (answer.selectedAnswer) {
    if (answer.isCorrect === null) {
      answerState = 'answered';
    } else {
      answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answerState.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[activeQuestionIdx].text}</h2>
      <Answers
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={answer.selectedAnswer}
        activeQuestionIdx={activeQuestionIdx}
      />
      <div id="skip-action">
        <button onClick={onSkipAnswer}>Skip</button>
      </div>
    </div>
  );
}