import QUESTIONS from "../questions.js";
import Answer from "./Answer.jsx";
import {useRef} from "react";

export default function Answers({answerState, onSelectAnswer, selectedAnswer, activeQuestionIdx}) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIdx].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // sort: negative swaps the numbers, positive keeps the order
  }

  return (
    <ul id="answers">
      {
        shuffledAnswers.current.map(answer => (
          <Answer key={answer} answerText={answer} answerState={answerState} onSelectAnswer={onSelectAnswer} selectedAnswer={selectedAnswer}/>
        ))
      }
    </ul>
  );
}