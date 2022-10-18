import React, { useEffect } from "react";
import { useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import wait from "../sounds/wait.mp3";

export default function Trivia({
  data,
  setTimeIsOver,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [isCorrect] = useSound(correct);
  const [isWrong] = useSound(wrong);
  const [mainClass, setMainClass] = useState("answers");
  const [isWait] = useSound(wait);

  useEffect(() => {
    letsPlay();
    isWait();
  }, [letsPlay, isWait]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    setMainClass("answers");
  }, [question]);

  const handleClick = (e) => {
    setMainClass("answers-dis");
    setSelectedAnswer(e);
    setClassName("answer active");
    setTimeout(() => {
      setClassName(e.correct ? "answer correct" : "answer wrong");
    }, 3000);
    setTimeout(() => {
      if (e.correct) {
        isCorrect();
        setTimeout(() => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        }, 3000);
      } else {
        isWrong();
        setTimeout(() => {
          setTimeIsOver(true);
        }, 3000);
      }
    }, 6000);
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className={mainClass}>
        {question?.answers.map((e) => (
          <div
            key={e.text}
            className={selectedAnswer === e ? className : "answer"}
            onClick={() => handleClick(e)}
          >
            {e.text}
          </div>
        ))}
      </div>
    </div>
  );
}
