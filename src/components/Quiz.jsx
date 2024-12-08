import Question from "./Question.jsx";
import {useState, useCallback} from "react";
import questions from "../questions.js";
import Answers from "./Answers.jsx";

const INITIAL_TIMER = 6000;

export default function Quiz() {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: [],
    state: 'not-selected',
    timer: INITIAL_TIMER,
  });

  function handleSelectAnswer(idx) {
    setQuizState(prevState => {
      const newAnswers = [...prevState.answers];
      newAnswers[prevState.currentQuestion] = idx;

      return {
        ...prevState,
        answers: newAnswers,
        state: 'selected',
        timer: 1000,
      }
    });
  }

  const handleCheckAnswer = useCallback(
    function handleCheckAnswer() {
      setQuizState(prevState => {
        return {
          ...prevState,
          state: 'check-answer',
          timer: 2000
        }
      });
  }, []);

  const handleNextQuestion = useCallback(function handleNextQuestion() {
    // noinspection JSPrimitiveTypeWrapperUsage
    setQuizState(prevState => ({
      ...prevState,
      currentQuestion: prevState.currentQuestion + 1,
      state: 'not-selected',
      timer: new Number(INITIAL_TIMER) // to trigger a re-render of the progress bar
    }));
  }, []);

  return (
    <section id="quiz">
      {
        quizState.currentQuestion < questions.length ?
          <>
            <Question
              questionText={questions[quizState.currentQuestion].text}
              timer={quizState.timer}
              state={quizState.state}
              onCheckAnswer={handleCheckAnswer}
              onNextQuestion={handleNextQuestion}
            />
            <Answers
              currentQuestion={quizState.currentQuestion}
              onSelectAnswer={handleSelectAnswer}
              answers={quizState.answers}
              state={quizState.state}
            />
            <div id="skip-action">
              <button onClick={handleNextQuestion}>Skip</button>
            </div>
          </> :
          undefined
      }
    </section>
  );
}