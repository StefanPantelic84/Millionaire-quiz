import { useEffect, useState } from "react";

function Timer({ setTimeIsOver, questionNumber }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) {
      setTimeIsOver(true);
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeIsOver]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
}

export default Timer;
