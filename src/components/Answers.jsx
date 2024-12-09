import QUESTIONS from "../questions.js";
import Answer from "./Answer.jsx";
import {useContext} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function Answers() {
  const {currentQuestion} = useContext(QuizContext);

  return (
    <ul id="answers">
      {
        QUESTIONS[currentQuestion].answers.map(answer => (
          <Answer key={answer} answerText={answer}/>
        ))
      }
    </ul>
  );
}