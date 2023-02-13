import { React } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function Game() {
  
  // const board = null;
  const game = new Chess();
  // var [status, setStatus] = game.status();
  // var [fen, setFen] = game.fen();
  // var [pgn,setPgn] = game.pgn();

  function handleDragStart (source, piece, position, orientation) {
    console.log("dragging")
    // do not pick up pieces if the game is over
    if (game.game_over()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function handleDrop (source, target) {
    console.log("dropping")
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  
  }

  // var config = {
  //   draggable: true,
  //   position: 'start',
  //   onDragStart: onDragStart,
  //   onDrop: onDrop,
  //   onSnapEnd: onSnapEnd
  // }

  // board = Chessboard('myBoard', config)

  return (
    <div className="board">
      <Chessboard
        draggable='true'
        position='start'
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
      {/* <label>Status:</label>
      <div id="status"></div>
      <label>FEN:</label>
      <div id="fen"></div>
      <label>PGN:</label>
      <div id="pgn"></div> */}
    </div>
    
  ) 

}