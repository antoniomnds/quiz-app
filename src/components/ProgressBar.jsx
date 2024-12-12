import {useState, useEffect, useContext} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function ProgressBar() {
  const {timer, state} = useContext(QuizContext);
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval =
      setInterval(
        () => {
          setRemainingTime(prevTime => prevTime - 10)
        },
        10
      );

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <progress
      className={state === 'check-answer' ? 'answered' : undefined}
      value={remainingTime}
      max={timer}
    />
  );
}