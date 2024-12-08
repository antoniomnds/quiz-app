import questions from "../questions.js";
import Answer from "./Answer.jsx";

export default function Answers({currentQuestion, onSelectAnswer, answers, state}) {
  return (
    <ul id="answers">
      {
        questions[currentQuestion].answers.map((answer, idx) => (
          <Answer
            key={answer}
            idx={idx}
            answerText={answer}
            onSelect={onSelectAnswer}
            answers={answers}
            currentQuestion={currentQuestion}
            state={state}
          />
        ))
      }
    </ul>
  );
}