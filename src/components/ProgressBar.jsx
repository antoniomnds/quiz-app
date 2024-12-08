import {useState, useEffect} from "react";

export default function ProgressBar({timer, state}) {
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