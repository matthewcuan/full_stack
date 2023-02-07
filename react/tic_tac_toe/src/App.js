
import { useState } from 'react';

function Square({ value, onSquareClick, isWinningSquare, onDraw }) {
  return (
    <button className={`square ${isWinningSquare ? "winning-square": ""} ${onDraw ? "draw": ""}`} 
    onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winningSquares, gameOver }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;    
  if (winner) {
    status = "Winner: " + winner[0];
  }  else if (!gameOver) {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } else {
    status = "It's a draw!"
  }

  function createGrid() {
    let grid = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        const squareIndex = (j * 3) + i;
        row.push(
        <Square 
          key={squareIndex}
          value={squares[squareIndex]} 
          onSquareClick={() => handleClick(squareIndex)} 
          onDraw={gameOver && !winner}
          isWinningSquare={winningSquares && winningSquares.includes(squareIndex)}/>
        ); 
      }
      grid.push(<div className="board-row">{row}</div>);
    }
    return grid;
  }
  
  return (
    <>
      <div className="status">{status}</div>
      <div className="grid">{createGrid()}</div>
    </>
  );
}

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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;

}

