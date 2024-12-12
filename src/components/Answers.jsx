import QUESTIONS from "../questions.js";
import Answer from "./Answer.jsx";
import {useContext, useRef} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function Answers() {
  const {currentQuestion} = useContext(QuizContext);
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[currentQuestion].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {
        shuffledAnswers.current.map(answer => (
          <Answer key={answer} answerText={answer}/>
        ))
      }
    </ul>
  );
}