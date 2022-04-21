import React, { useEffect, useState } from 'react';
import Row from './Row';

const ROWS = 6;

const Grid = ({ activeGuess, answer, guessableSet }) => {
  console.log(guessableSet);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState('');

  const updateGuess = (event) => {
    setGuess(event.target.value);
  };

  const addGuess = () => {
    if (guessableSet.has(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      console.log('error for ' + guess);
    }
  };

  const emptyRows = Array(ROWS - guesses.length - 1).fill(undefined);

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
      <input value={guess} onChange={(event) => updateGuess(event)} />
      <button onClick={() => addGuess()}>Enter</button>
    </>
  );
};

export default Grid;
