import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Keyboard from './Keyboard';
import guessableWords from '../assets/guessableWords';
import winningWords from '../assets/winningWords';
import { WORD_LENGTH } from '../constants';

const Wordle = () => {
  const [answer, setAnswer] = useState('');
  const [activeGuess, setActiveGuess] = useState('');
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    const guessableSet = new Set(guessableWords.split(/\n/));
    const addGuess = () => {
      if (activeGuess.length === WORD_LENGTH && guessableSet.has(activeGuess)) {
        setGuesses([...guesses, activeGuess]);
        setActiveGuess('');
      } else {
        console.log('error for ' + activeGuess);
      }
    };

    const onKeyDown = (e) => {
      console.log('event', e.code);
      if (e.code === 'Enter') {
        addGuess();
      } else if (e.code === 'Backspace') {
        if (activeGuess) {
          const newGuess = activeGuess.slice(0, activeGuess.length - 1);
          setActiveGuess(newGuess);
        }
      } else {
        const key = e.key.toLowerCase();
        if (key.length === 1 && key >= 'a' && key <= 'z') {
          if (activeGuess.length < WORD_LENGTH) {
            const newGuess = `${activeGuess}${key}`;
            setActiveGuess(newGuess);
          }
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeGuess, setActiveGuess, guesses]);

  useEffect(() => {
    const winningList = winningWords.split(/\n/);
    const randIndex = Math.round(Math.random() * winningList.length);
    const newAnswer = winningList[randIndex];
    setAnswer(newAnswer);
  }, []);

  return (
    <>
      <h1 className="title">wordo</h1>
      <Grid activeGuess={activeGuess} answer={answer} guesses={guesses} />
      <Keyboard usedLetters={[]} />
    </>
  );
};

export default Wordle;
