import "./App.css"
import { React } from "react";
import Chessboard from "@chrisoakman/chessboardjs";
import { Chess } from "chess.js";

export default function App() {

  const game = new Chess();
  const Board = null;
  console.log(game.ascii());

  function handleDragStart (source, piece, position, orientation) {
    console.log("dragging")
    // do not pick up pieces if the game is over
    if (game.isGameOver()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function handleDrop (source, target) {
    console.log("dropped")
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) {
      alert("Illegal move! Please try again.")
      return 'snapback';
    }
    
    console.log(game.ascii());
    console.log(game.fen())
    console.log("should be returning true")

    return true;
  }

  // function newBoard(fen) {
  //   
  //   return (
  //     <Chessboard
  //       config={config}
  //     />
  //   )
  // }

  const config = {
        draggable: true,
        position: game.fen(),
        onDragStart: handleDragStart,
        onDrop: handleDrop,
        // onSnapEnd: onSnapEnd
      }

  Board = Chessboard(config)

  return (
    <div className="main">
      <div className="board">
        <Board />
      </div>
    </div>
  ) 
} 