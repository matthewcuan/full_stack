import Square from "./Square.js";
import calculateWinner from "./calculateWinner.js";

export default function Board({ xIsNext, squares, onPlay, winningSquares, gameOver }) {
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

