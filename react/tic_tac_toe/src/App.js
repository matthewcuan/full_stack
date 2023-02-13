import { useState } from 'react';
import Board from './components/Board.js';
import calculateWinner from './components/calculateWinner.js';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const winner = calculateWinner(currentSquares);
  const winningSquares = winner ? winner.slice(1) : null;

  const gameOver = currentMove === 9;

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    if (move !== currentMove) {
      let description;
      (move > 0) ? description = 'Go to move #' + move: 
        description = 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    } else if (!gameOver) {
      return (
        <li key={move}>
        You are at move #{currentMove}.
      </li>
      )
    } else {
      return (
        <li key={move}>
        Game over!
      </li>
      )
    }
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
          winningSquares={winningSquares}
          gameOver={gameOver}
          />
      </div>
      <div className="game-info">
        <ol start="0">{moves}</ol>
      </div>
    </div>
  );
}