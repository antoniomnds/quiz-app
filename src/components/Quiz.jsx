import Question from "./Question.jsx";
import {useContext} from "react";
import questions from "../questions.js";
import Answers from "./Answers.jsx";
import Summary from "./Summary.jsx";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function Quiz() {
  const {currentQuestion, nextQuestion} = useContext(QuizContext);

  return (
    <section id="quiz">
      {
        currentQuestion < questions.length ?
          <>
            <Question />
            <Answers />
            <div id="skip-action">
              <button onClick={nextQuestion}>Skip</button>
            </div>
          </> :
          <Summary />
      }
    </section>
  );
}