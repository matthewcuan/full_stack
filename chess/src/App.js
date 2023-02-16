import "./App.css"
import { React, useState } from "react";
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js";

export default function App() {

  const [game, setGame] = useState(new Chess());
  console.log("at the top")
  console.log(game.ascii());

  function safeGameMutate(modify){
    setGame(()=> {
      const update = new Chess ()
      update.loadPgn(game.pgn())
      modify(update)
      return update
    })
  }

  function handlePieceDragBegin (source, piece, position, orientation) {
    console.log("dragging")
    // do not pick up pieces if the game is over
    if (game.isGameOver()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function handlePieceDrop (source, target, piece) {
    console.log("dropped")
    // see if the move is legal
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion:'q'
      })
  })

  console.log(move)
  
    // illegal move
    if (move === null) {
      alert("Illegal move! Please try again.")
      return false;
    }
    
    console.log("after move")  
    console.log(fen())
    console.log("finishing function")

    return true;
  }

  // function newBoard(fen) {
  //   const config = {
  //     draggable: true,
  //     position: game.fen(),
  //     onDragStart: onDragStart,
  //     onDrop: onDrop,
  //     // onSnapEnd: onSnapEnd
  //   }
  //   return (
  //     <Chessboard
  //       config={config}
  //     />
  //   )
  // }

  function fen() {
    return game.fen();
  }

  return (
    <div className="main">
      <div className="board">
        <Chessboard 
          position={fen()}
          onPieceDragBegin={handlePieceDragBegin}
          onPieceDrop={handlePieceDrop}
        />
      </div>
    </div>
  ) 
} 