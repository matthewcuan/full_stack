import { Chess} from 'chess.js';
import { Chessboard } from "react-chessboard";

var randomBoard = null
var game = new Chess()

function makeRandomMove () {
  var possibleMoves = game.moves()

  // exit if the game is over
  if (game.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  randomBoard.position(game.fen())

  window.setTimeout(makeRandomMove, 500)
}

randomBoard = Chessboard('myBoard', 'start')

window.setTimeout(makeRandomMove, 500)

export default randomBoard