import {useContext, useEffect, useState} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";
import QUESTIONS from "../questions.js";

export default function Answer({answerText}) {
  const {currentQuestion, userAnswers, state, selectAnswer} = useContext(QuizContext);
  const [highlight, setHighlight] = useState(undefined);

  function handleClick() {
    if (userAnswers[currentQuestion] !== null || state !== 'not-selected') {
      return; // question already answered
    }
    setHighlight(null);
    selectAnswer(answerText);
  }

  useEffect(() => {
    if (state === 'check-answer' && answerText === userAnswers[currentQuestion]) {
      if (answerText === QUESTIONS[currentQuestion].answers[0]) {
        setHighlight(true);
      } else  {
        setHighlight(false);
      }
    }
  }, [state]);

  let klass;
  if (highlight === null) {
    klass = "selected";
  } else if (highlight === true){
    klass = "correct";
  } else if (highlight === false) {
    klass = "wrong";
  }

  return (
    <li className="answer">
      <button className={klass} onClick={handleClick}>{answerText}</button>
    </li>
  );
}