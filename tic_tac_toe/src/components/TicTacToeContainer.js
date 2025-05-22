import React, { useState, useEffect } from 'react';
import TicTacToeSquare from './TicTacToeSquare';
import './TicTacToe.css';

/**
 * TicTacToeContainer is the main container component for the TicTacToe game.
 * It manages the game state, player turns, win logic, and rendering the 3x3 grid.
 * 
 * @returns {JSX.Element} - The TicTacToe game container
 */
const TicTacToeContainer = () => {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Calculate the current player
  const currentPlayer = xIsNext ? 'X' : 'O';

  // Effect to check for winner or draw after each move
  useEffect(() => {
    const calculatedWinner = calculateWinner(board);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      // Update scores when there's a winner
      setScores(prevScores => ({
        ...prevScores,
        [calculatedWinner]: prevScores[calculatedWinner] + 1
      }));
    } else if (board.every(square => square !== null)) {
      // If all squares are filled and no winner, it's a draw
      setIsDraw(true);
      setScores(prevScores => ({
        ...prevScores,
        draws: prevScores.draws + 1
      }));
    }
  }, [board]);

  /**
   * Handle a player's move when they click a square
   * @param {number} index - The index of the clicked square (0-8)
   */
  const handleClick = (index) => {
    // If square is already filled or game is over, do nothing
    if (board[index] || winner || isDraw) {
      return;
    }

    // Create a new copy of the board
    const newBoard = [...board];
    // Set the square to the current player
    newBoard[index] = currentPlayer;
    // Update the board state
    setBoard(newBoard);
    // Switch to the next player
    setXIsNext(!xIsNext);
  };

  /**
   * Reset the game to start a new round
   */
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  /**
   * Reset the game and clear the score
   */
  const handleResetGame = () => {
    handleRestart();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  /**
   * Render a status message based on the current game state
   * @returns {JSX.Element} - Status message element
   */
  const renderStatus = () => {
    if (winner) {
      return <div className="status status-winner">Winner: Player {winner}</div>;
    } else if (isDraw) {
      return <div className="status">Game ended in a draw!</div>;
    } else {
      return <div className="status">Next player: {currentPlayer}</div>;
    }
  };

  /**
   * Render the game board with squares
   * @returns {JSX.Element} - The game board element
   */
  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((value, index) => (
          <TicTacToeSquare
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            disabled={value !== null || winner !== null || isDraw}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="tictactoe-container">
      <h2 className="game-title">Tic Tac Toe</h2>
      
      <div className="player-info">
        <div className={`player ${currentPlayer === 'X' && !winner && !isDraw ? 'active' : ''}`}>
          Player X
        </div>
        <div className={`player ${currentPlayer === 'O' && !winner && !isDraw ? 'active' : ''}`}>
          Player O
        </div>
      </div>
      
      {renderStatus()}
      {renderBoard()}
      
      <div className="game-info">
        <div className="score-board">
          <span>X: {scores.X}</span>
          <span>Draws: {scores.draws}</span>
          <span>O: {scores.O}</span>
        </div>
        
        <div className="game-controls">
          <button className="btn" onClick={handleRestart}>New Round</button>
          <button className="btn" onClick={handleResetGame}>Reset Game</button>
        </div>
      </div>
    </div>
  );
};

/**
 * Calculate the winner of the game based on the board state
 * @param {Array} squares - The current board state
 * @returns {string|null} - The winner ('X' or 'O') or null if there's no winner
 */
function calculateWinner(squares) {
  // All possible winning lines (rows, columns, diagonals)
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  // Check each winning line
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If all three squares in a line have the same non-null value
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  // If no winner is found
  return null;
}

export default TicTacToeContainer;
