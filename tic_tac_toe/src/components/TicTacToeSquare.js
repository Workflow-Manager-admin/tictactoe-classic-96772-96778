import React from 'react';
import './TicTacToe.css';

/**
 * TicTacToeSquare component represents a single cell in the TicTacToe game grid.
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.value - The value of the square ('X', 'O', or null)
 * @param {Function} props.onClick - Function to handle click on the square
 * @param {boolean} props.disabled - Whether the square is disabled
 * @returns {JSX.Element} - A square button element
 */
const TicTacToeSquare = ({ value, onClick, disabled }) => {
  // Determine CSS classes based on value and disabled state
  const squareClass = `square ${value ? value.toLowerCase() : ''} ${disabled ? 'disabled' : ''}`;
  
  return (
    <button 
      className={squareClass} 
      onClick={onClick} 
      disabled={disabled}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
};

export default TicTacToeSquare;
