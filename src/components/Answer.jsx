import {useEffect, useState} from "react";
import {correctAnswers} from "../contexts/QuizContextProvider.jsx";

export default function Answer({answerText, idx, onSelect, answers, currentQuestion, state}) {
  const [highlight, setHighlight] = useState(undefined);

  function handleClick() {
    if (answers[currentQuestion] !== null) {
      return; // question already answered
    }
    setHighlight(null);
    onSelect(idx);
  }

  useEffect(() => {
    if (state === 'check-answer' && idx === answers[currentQuestion]) {
      if (idx === correctAnswers[currentQuestion]) {
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