import "./App.css"
import { React, useState } from "react";
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js";

export default function App() {

  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([game.history()]);
  
  function handlePieceDrop(source, target) {
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })

    if (move) {
      setGame(game);
      console.log(game.ascii());
      setHistory(game.history());
      console.log(history)
      return true;
    }

    alert("Illegal move! Try again.");
    return false;
  };
 
  // const [game, setGame] = useState(new Chess());
  // const [history, setHistory] = useState(game.history());
  // console.log("at the top")
  // console.log(game.ascii());

  // function safeGameMutate(modify){
  //   setGame(()=> {
  //     console.log("updating game")
  //     const update = new Chess ()
  //     console.log("attempting to load old fen to new game")
  //     console.log(game.ascii())
  //     update.load(game.fen())
  //     console.log("loaded old fen to new game")
  //     console.log(update.ascii())
  //     console.log("attempting to update to new fen")
  //     modify(update)
  //     console.log("updated to new fen")
  //     console.log(update.ascii())
  //     return update
  //   })
  // }

  // function handlePieceDragBegin (source, piece, position, orientation) {
  //   console.log("dragging")
  //   // do not pick up pieces if the game is over
  //   if (game.isGameOver()) return false
  
  //   // only pick up pieces for the side to move
  //   if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
  //       (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
  //     return false
  //   }
  // }

  // function handlePieceDrop (source, target, piece) {
  //   console.log("dropped")
  //   // see if the move is legal
  //   let move = null;
  //   console.log("going to update")
  //   safeGameMutate((game) => {
  //     console.log("modifying new game")
  //     move = game.move({
  //       from: source,
  //       to: target,
  //       promotion:'q'
  //     })
  //   })
    
  //   console.log("updated")
  //   console.log(move)
  
  //   // illegal move
  //   if (move === null) {
  //     // alert("Illegal move! Please try again.")
  //     console.log("illegal move")
  //     return false;
  //   }
    
  //   console.log("after move")  
  //   console.log(game.ascii())
  //   console.log("finishing function")

  //   return true;
  // }

  // function fen() {
  //   return game.fen();
  // }

  return (
    <div className="main">
      <div className="board">
        <Chessboard 
          position={game.fen()}
          // onPieceDragBegin={handlePieceDragBegin}
          onPieceDrop={handlePieceDrop}
        />
      </div>
    </div>
  ) 
} 