import React from 'react';
import Row from './Row';

const ROWS = 6;

const Grid = ({ activeGuess, answer, guesses }) => {
  const emptyRows =
    guesses.length === ROWS
      ? []
      : Array(ROWS - guesses.length - 1).fill(undefined);

  return (
    <>
      <div className="grid">
        {guesses.map((r, index) => (
          <Row
            guess={index < guesses.length ? guesses[index] : ''}
            isCompleted={true}
            answer={answer}
          />
        ))}
        <Row guess={activeGuess} isCompleted={false} />
        {emptyRows.map((r) => (
          <Row isBlank={true} isCompleted={false} />
        ))}
      </div>
    </>
  );
};

export default Grid;
