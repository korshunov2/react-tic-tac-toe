import React, { useState } from "react";
import { Table } from "reactstrap";
import Cell from "./Cell";
import "./App.css";

type GameStatus = 'playing' | 'draw' | 'victory';

function Board() {
  const [data, setData] = useState<string[]>(Array(9).fill(""));
  const [symbol, setSymbol] = useState<string>("X");
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

  const winningCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const nextSymbol = () => {
    setSymbol(symbol === "X" ? "O" : "X");
  };

  const handleClick = (index: number) => {
    if (gameStatus === 'playing' && data[index] === "") {
      const newData = [...data];
      newData[index] = symbol;
      setData(newData);

      const hasVictory = checkVictory(newData);
      if (hasVictory) {
        setGameStatus('victory');
      } else if (newData.every(cell => cell !== "")) {
        setGameStatus('draw');
      } else {
        nextSymbol();
      }
    }
  };

  const checkVictory = (newData: string[]) => {
    for (const [i1, i2, i3] of winningCombos) {
      const e1 = newData[i1];
      const e2 = newData[i2];
      const e3 = newData[i3];
      if (e1 !== "" && e1 === e2 && e1 === e3) return true;
    }
    return false;
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setSymbol("X");
    setGameStatus('playing');
  };

  const gameStatusMessage = () => {
    if (gameStatus === 'playing') {
      return "Current player: " + symbol;
    } else if (gameStatus === 'draw') {
      return "It's a draw!";
    } else {
      return symbol + " wins!";
    }
  };

  return (
    <>
      <h1>{gameStatusMessage()}</h1>
      <Table bordered className="table">
        <tbody>
          <tr>
            <Cell value={data[0]} onClick={() => handleClick(0)} />
            <Cell value={data[1]} onClick={() => handleClick(1)} />
            <Cell value={data[2]} onClick={() => handleClick(2)} />
          </tr>
          <tr>
            <Cell value={data[3]} onClick={() => handleClick(3)} />
            <Cell value={data[4]} onClick={() => handleClick(4)} />
            <Cell value={data[5]} onClick={() => handleClick(5)} />
          </tr>
          <tr>
            <Cell value={data[6]} onClick={() => handleClick(6)} />
            <Cell value={data[7]} onClick={() => handleClick(7)} />
            <Cell value={data[8]} onClick={() => handleClick(8)} />
          </tr>
        </tbody>
      </Table>
      {gameStatus !== 'playing' && <button onClick={resetGame}>Reset Game</button>}
    </>
  );
}

export default Board;