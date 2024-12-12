import Question from "./Question.jsx";
import {useState, useCallback} from "react";
import QUESTIONS from "../questions.js";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIdx = userAnswers.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null)
    , [handleSelectAnswer]
  );

  if (activeQuestionIdx === QUESTIONS.length) { // quiz is complete
    return <Summary userAnswers={userAnswers}/>;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx}
        activeQuestionIdx={activeQuestionIdx}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}/>
    </div>
  );
}