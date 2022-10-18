import "./App.css";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeIsOver, setTimeIsOver] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPiramyd = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 400" },
        { id: 5, amount: "$ 500" },
        { id: 6, amount: "$ 600" },
        { id: 7, amount: "$ 700" },
        { id: 8, amount: "$ 800" },
        { id: 9, amount: "$ 900" },
        { id: 10, amount: "$ 1000" },
        { id: 11, amount: "$ 1100" },
        { id: 12, amount: "$ 1200" },
        { id: 13, amount: "$ 1300" },
        { id: 14, amount: "$ 1400" },
        { id: 15, amount: "$ 1500" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPiramyd.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPiramyd, questionNumber]);

  const RestartClick = () => {
    setTimeIsOver(false);
    setUsername("");
    setQuestionNumber(1);
  };

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeIsOver ? (
              <>
                <div className="endText">
                  <h1>You won: {earned}</h1>
                  <button onClick={RestartClick}>Restart</button>
                </div>
              </>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeIsOver={setTimeIsOver}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeIsOver={setTimeIsOver}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPiramyd.map((e) => (
                <li
                  key={e.id}
                  className={
                    questionNumber === e.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{e.id}</span>
                  <span className="moneyListItemText">{e.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
