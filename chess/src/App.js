import './App.css';
import { Chessboard } from "react-chessboard";

function App() {
  return (
    <div class="main">
      <div class="board">
        <Chessboard id="BasicBoard" />
      </div>
    </div>
  );
}

export default App;
