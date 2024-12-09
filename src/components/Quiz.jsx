import Question from "./Question.jsx";
import {useContext} from "react";
import QUESTIONS from "../questions.js";
import Summary from "./Summary.jsx";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function Quiz() {
  const {currentQuestion} = useContext(QuizContext);

  return (
    <main id="quiz">
      {
        currentQuestion < QUESTIONS.length ?
          <Question /> : <Summary />
      }
    </main>
  );
}