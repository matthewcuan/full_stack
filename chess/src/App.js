import "./App.css"
import { React } from "react";
import { Chessboard } from "react-chessboard";
// import { Chess } from "chess.js";

export default function App() {

  // const game = new Chess();

  // function onDragStart (source, piece, position, orientation) {
  //   console.log("dragging")
  //   // do not pick up pieces if the game is over
  //   if (game.isGameOver()) return false
  
  //   // only pick up pieces for the side to move
  //   if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
  //       (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
  //     return false
  //   }
  // }

  // function onDrop (source, target) {
  //   console.log("dropping")
  //   // see if the move is legal
  //   var move = game.move({
  //     from: source,
  //     to: target,
  //     promotion: 'q' // NOTE: always promote to a queen for example simplicity
  //   })
  
  //   // illegal move
  //   if (move === null) {
  //     alert("Illegal move! Please try again.")
  //     return 'snapback'
  //   }
  
  // }

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
 
  return (
    <div className="main">
      <div className="board">
        <Chessboard
          onDragStart={() => console.log('You dragged me!')}
          onDrop={() => console.log('You dropped me >:(')}
        />
      </div>
    </div>
  ) 


} 