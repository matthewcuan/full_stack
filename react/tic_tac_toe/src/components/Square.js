export default function Square({ value, onSquareClick, isWinningSquare, onDraw }) {
  return (
    <button className={`square ${isWinningSquare ? "winning-square": ""} ${onDraw ? "draw": ""}`} 
    onClick={onSquareClick}>
      {value}
    </button>
  );
}