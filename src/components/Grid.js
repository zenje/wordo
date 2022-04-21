import React, { useEffect, useState } from 'react';
import Row from './Row';

const ROWS = 6;

const Grid = ({ answer, guessableSet }) => {
  console.log(guessableSet);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState('');
  useEffect(() => {
    //setGuesses(['crane', 'shine']);
  }, []);

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

  return (
    <>
      <div className="grid">
        {[...Array(ROWS)].map((r, index) => (
          <Row
            guess={index < guesses.length ? guesses[index] : ''}
            answer={answer}
          />
        ))}
      </div>
      <input value={guess} onChange={(event) => updateGuess(event)} />
      <button onClick={() => addGuess()}>Enter</button>
    </>
  );
};

export default Grid;
