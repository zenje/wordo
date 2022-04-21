import React from 'react';

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

const BlankRow = ({ answer }) => {
  return (
    <div className="row">
      {answer.split('').map((c) => (
        <Cell />
      ))}
    </div>
  );
};

const Row = ({ guess, answer }) => {
  const letters = new Set(answer.split(''));
  if (guess) {
    return <GuessedRow guess={guess} answer={answer} letters={letters} />;
  }
  return <BlankRow answer={answer} />;
};

export default Row;
