import ProgressBar from "./ProgressBar.jsx";
import {useEffect} from "react";

export default function Question({questionText, timer, state, onCheckAnswer, onNextQuestion}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state === 'check-answer') {
        onNextQuestion();
      } else { // not-selected and timed out or selected
        onCheckAnswer();
      }
    }, timer);

    return () => {
      clearTimeout(timeout);
    }
  }, [state, timer, onCheckAnswer, onNextQuestion]);

  return (
    <div id="question">
      <ProgressBar timer={timer} state={state} />
      <h2>{questionText}</h2>
    </div>
  );
}