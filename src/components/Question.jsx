import ProgressBar from "./ProgressBar.jsx";
import {useEffect, useContext} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";
import questions from "../questions.js";

export default function Question() {
  const {currentQuestion, timer, state, checkAnswer, nextQuestion} = useContext(QuizContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state === 'check-answer') {
        nextQuestion();
      } else { // not-selected and timed out or selected
        checkAnswer();
      }
    }, timer);

    return () => {
      clearTimeout(timeout);
    }
  }, [state, timer, checkAnswer, nextQuestion]);

  return (
    <div id="question">
      <ProgressBar />
      <h2>{questions[currentQuestion].text}</h2>
    </div>
  );
}