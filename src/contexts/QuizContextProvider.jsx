import {useReducer, createContext, useCallback} from "react";
import QUESTIONS from "../questions.js";

const INITIAL_TIMER = 6000;

export const QuizContext = createContext({
  currentQuestion: 0,
  userAnswers: [],
  state: 'not-selected',
  timer: INITIAL_TIMER,
  selectAnswer: () => {},
  checkAnswer: () => {},
  nextQuestion: () => {},
});

function quizReducer(state, action) {
  if (action.type === 'SELECT_ANSWER') {
    const newAnswers = [...state.userAnswers];
    newAnswers[state.currentQuestion] = action.payload.selectedAnswer;

    return {
      ...state,
      userAnswers: newAnswers,
      state: 'selected',
      timer: 1000,
    }
  } else if (action.type === 'CHECK_ANSWER') {
    return {
      ...state,
      state: 'check-answer',
      timer: 2000
    }
  } else if (action.type === 'NEXT_QUESTION') {
    // noinspection JSPrimitiveTypeWrapperUsage
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      state: 'not-selected',
      timer: new Number(INITIAL_TIMER) // to trigger a re-render of the progress bar
    }
  }

  return state;
}

export default function QuizContextProvider({children}) {
  const [quizState, quizDispatch] = useReducer(
    quizReducer,
    {
      currentQuestion: 0,
      userAnswers: new Array(QUESTIONS.length).fill(null),
      state: 'not-selected',
      timer: INITIAL_TIMER,
    }
  );

  function handleSelectAnswer(selectedAnswer) {
    quizDispatch({
      type: 'SELECT_ANSWER',
      payload: {
        selectedAnswer
      }
    });
  }

  const handleCheckAnswer = useCallback(
    function handleCheckAnswer() {
      quizDispatch({
        type: 'CHECK_ANSWER'
      })
    }, []);

  const handleNextQuestion = useCallback(function handleNextQuestion() {
    quizDispatch({
      type: 'NEXT_QUESTION'
    })
  }, []);

  const ctxValue = {
    currentQuestion: quizState.currentQuestion,
    userAnswers: quizState.userAnswers,
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