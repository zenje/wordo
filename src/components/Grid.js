import React from 'react';
import Row from './Row';

const ROWS = 6;

const Grid = ({ activeGuess, answer, guesses }) => {
  const emptyRows =
    guesses.length === ROWS
      ? []
      : Array(ROWS - guesses.length - 1).fill(undefined);

  return (
    <div className="board-container">
      <div className="board">
        {guesses.map((r, index) => (
          <Row
            key={`guessedRow-${index}`}
            rowIndex={index}
            guess={index < guesses.length ? guesses[index] : ''}
            isCompleted={true}
            answer={answer}
          />
        ))}
        <Row
          rowIndex={guesses.length}
          guess={activeGuess}
          isCompleted={false}
        />
        {emptyRows.map((r, index) => (
          <Row
            key={`emptyRow-${index}`}
            rowIndex={guesses.length + index + 1}
            isBlank={true}
            isCompleted={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
