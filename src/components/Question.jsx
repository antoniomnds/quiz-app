import ProgressBar from "./ProgressBar.jsx";
import {useEffect, useContext} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";

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
      <ProgressBar key={timer} />
      <h2>{QUESTIONS[currentQuestion].text}</h2>
      <Answers key={currentQuestion} />
      <div id="skip-action">
        <button onClick={nextQuestion}>Skip</button>
      </div>
    </div>
  );
}