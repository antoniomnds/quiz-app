import questions from "../questions.js";
import Answer from "./Answer.jsx";
import {useContext} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function Answers() {
  const {currentQuestion} = useContext(QuizContext);

  return (
    <ul id="answers">
      {
        questions[currentQuestion].answers.map((answer, idx) => (
          <Answer key={answer} idx={idx} answerText={answer}/>
        ))
      }
    </ul>
  );
}