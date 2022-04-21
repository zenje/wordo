import React from 'react';
import { WORD_LENGTH } from '../constants';

const Cell = ({ letter, isMatching, isPresent }) => {
  if (letter) {
    let classNames = `cell ${
      isMatching ? `correct` : `${isPresent ? `present` : `wrong`}`
    }`;
    return <div className={classNames}>{letter}</div>;
  }
  return <div className="cell emptyCell" />;
};

const GuessedRow = ({ guess, answer, letters }) => {
  return (
    <div className="row">
      {guess.split('').map((c, i) => (
        <Cell
          letter={c}
          isMatching={answer[i] === c}
          isPresent={letters.has(c)}
        />
      ))}
    </div>
  );
};

const ActiveRow = ({ guess }) => {
  const emptyCells = Array(WORD_LENGTH - guess.length).fill(undefined);
  return (
    <div className="row">
      {guess.split('').map((c, i) => (
        <Cell letter={c} />
      ))}
      {emptyCells.map((c, i) => (
        <Cell />
      ))}
    </div>
  );
};

const BlankRow = () => {
  return (
    <div className="row">
      {Array(WORD_LENGTH)
        .fill(undefined)
        .map((c) => (
          <Cell />
        ))}
    </div>
  );
};

const Row = ({ guess = '', isBlank, isCompleted, answer = '' }) => {
  if (isBlank) {
    return <BlankRow />;
  }

  if (isCompleted) {
    const letters = new Set(answer.split(''));
    return <GuessedRow guess={guess} answer={answer} letters={letters} />;
  } else {
    return <ActiveRow guess={guess} />;
  }
};

export default Row;
