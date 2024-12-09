import {useState, useEffect, useContext} from "react";
import {QuizContext} from "../contexts/QuizContextProvider.jsx";

export default function ProgressBar() {
  const {timer, state} = useContext(QuizContext);
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    setRemainingTime(timer);
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
  }, [timer]);

  return (
    <progress
      className={state === 'answered' ? 'answered' : undefined}
      value={remainingTime}
      max={timer}
    />
  );
}