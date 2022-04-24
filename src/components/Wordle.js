import React, { useContext, useState } from 'react';
import guessableWords from '../assets/guessableWords';
import { ABSENT, CORRECT, PRESENT, TITLE, WORD_LENGTH } from '../constants';
import Grid from './Grid';
import Keyboard from './Keyboard';
import { WordleContext } from './WordleProvider';

const Wordle = () => {
  const [activeGuess, setActiveGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const { answer, answerLetters, letterStatus, setLetterStatus } =
    useContext(WordleContext);

  const onEnter = () => {
    const guessableSet = new Set(guessableWords.split(/\n/));
    if (activeGuess.length === WORD_LENGTH && guessableSet.has(activeGuess)) {
      setGuesses([...guesses, activeGuess]);
      setActiveGuess('');

      const newLetterStatus = { ...letterStatus };
      activeGuess.split('').forEach((letter, i) => {
        let status = ABSENT;
        if (answer[i] === letter) {
          status = CORRECT;
        } else if (answerLetters.has(letter)) {
          status = PRESENT;
        }
        newLetterStatus[letter] = status;
      });
      setLetterStatus(newLetterStatus);
    } else {
      console.log('error for ' + activeGuess);
    }
  };

  const onBackspace = () => {
    if (activeGuess) {
      const newGuess = activeGuess.slice(0, activeGuess.length - 1);
      setActiveGuess(newGuess);
    }
  };

  const onCharInput = (key) => {
    if (activeGuess.length < WORD_LENGTH) {
      const newGuess = `${activeGuess}${key}`;
      setActiveGuess(newGuess);
    }
  };

  return (
    <>
      <h1 className="title">{TITLE}</h1>
      <Grid activeGuess={activeGuess} guesses={guesses} />
      <Keyboard
        onEnter={onEnter}
        onBackspace={onBackspace}
        onCharInput={onCharInput}
      />
    </>
  );
};

export default Wordle;
