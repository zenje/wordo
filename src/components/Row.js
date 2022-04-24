import React from 'react';
import classnames from 'classnames';
import { WORD_LENGTH } from '../constants';
import { useWordleContext } from './WordleProvider';

const Cell = ({ letter, isCorrect, isPresent }) => {
  if (letter) {
    const classNames = classnames(
      'cell',
      { present: isPresent && !isCorrect },
      { correct: isCorrect }
    );
    return <div className={classNames}>{letter}</div>;
  }
  return <div className="cell emptyCell" />;
};

const GuessedRow = ({ guess, rowIndex }) => {
  const { answer, answerLetters } = useWordleContext();
  return (
    <div className="row">
      {guess.split('').map((c, i) => (
        <Cell
          key={`cell-${rowIndex}-${i}`}
          letter={c}
          isCorrect={answer[i] === c}
          isPresent={answerLetters.has(c)}
        />
      ))}
    </div>
  );
};

const ActiveRow = ({ guess, rowIndex }) => {
  const emptyCells = Array(WORD_LENGTH - guess.length).fill(undefined);
  return (
    <div className="row">
      {guess.split('').map((c, i) => (
        <Cell letter={c} key={`guess-${rowIndex}-${i}`} />
      ))}
      {emptyCells.map((c, i) => (
        <Cell key={`empty-${rowIndex}-${i}`} />
      ))}
    </div>
  );
};

const BlankRow = ({ rowIndex }) => {
  return (
    <div className="row">
      {Array(WORD_LENGTH)
        .fill(undefined)
        .map((c, i) => (
          <Cell key={`cell-${rowIndex}-${i}`} />
        ))}
    </div>
  );
};

const Row = ({ rowIndex, guess = '', isBlank, isCompleted }) => {
  if (isBlank) {
    return <BlankRow rowIndex={rowIndex} />;
  }

  if (isCompleted) {
    return <GuessedRow rowIndex={rowIndex} guess={guess} />;
  } else {
    return <ActiveRow rowIndex={rowIndex} guess={guess} />;
  }
};

export default Row;
