import {useState, createContext, useCallback} from "react";

const INITIAL_TIMER = 6000;

export const correctAnswers = [0, 0, 0, 0, 0, 0, 0];

export const QuizContext = createContext({
  currentQuestion: 0,
  answers: [],
  state: 'not-selected',
  timer: INITIAL_TIMER,
  selectAnswer: () => {},
  checkAnswer: () => {},
  nextQuestion: () => {},
});

export default function QuizContextProvider({children}) {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: new Array(correctAnswers.length).fill(null),
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

  const ctxValue = {
    currentQuestion: quizState.currentQuestion,
    answers: quizState.answers,
    state: quizState.state,
    timer: quizState.timer,
    selectAnswer: handleSelectAnswer,
    checkAnswer: handleCheckAnswer,
    nextQuestion: handleNextQuestion
  }
  return (
    <QuizContext.Provider value={ctxValue}>
      {children}
    </QuizContext.Provider>
  );
}