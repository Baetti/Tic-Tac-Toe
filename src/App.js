import React, { useState } from "react";
import "./App.css";
import xImage from "./images/x.png";
import oImage from "./images/360_F_218972406_6mhGLBesFhXG1tOth4KT8ViuQvNVlSGh.jpg";

function App() {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const toggle = (num) => {
    if (lock || data[num] || winner) {
      return;
    }

    const newData = [...data];
    newData[num] = count % 2 === 0 ? "X" : "O";
    setData(newData);
    setCount(count + 1);

    checkWin(newData);
  };

  const checkWin = (newData) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        setWinner(newData[a]);
        setLock(true);
        return;
      }
    }

    if (count === 8) {
      // All squares are filled, but no winner
      setLock(true);
    }
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  const newGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  return (
    <div style={{ height: "90vh" }} className="row w-100">
      <div className="gameBoard d-flex justify-content-center align-items-center ">
        <div className="row_one">
          <h1 className="text-center mb-4">TIC</h1>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row_two">
          <h1 className="text-center mb-4">TAC</h1>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row_three">
          <h1 className="text-center mb-4">TOE</h1>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="d-flex justify-content-center w-100 align-items-center">
        {winner ? (
          <div>
            <h2>Winner: {winner}</h2>
            <button className="btn btn-danger rounded" onClick={newGame}>
              NEW GAME
            </button>
          </div>
        ) : lock ? (
          <div>
            <h2>It's a draw!</h2>
            <button className="btn btn-danger rounded" onClick={newGame}>
              NEW GAME
            </button>
          </div>
        ) : (
          <button className="btn btn-danger rounded" onClick={resetGame}>
            RESET
          </button>
        )}
      </div>
    </div>
  );

  function renderSquare(num) {
    return (
      <div
        className="box border rounded m-1"
        onClick={() => {
          toggle(num);
        }}
      >
        {data[num] === "X" ? (
          <img
            className="rounded"
            src={xImage}
            alt="X"
            width="100%"
            height="100%"
          />
        ) : data[num] === "O" ? (
          <img
            className="rounded"
            src={oImage}
            alt="O"
            width="100%"
            height="100%"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
