import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import guessableWords from '../assets/guessableWords';
import winningWords from '../assets/winningWords';
import { WORD_LENGTH } from '../constants';

const Wordle = () => {
    const [activeGuess, setActiveGuess] = useState('');
    useEffect(() => {
        const onKeyDown = (e) => {
            console.log('event', e.code);
            if (e.code === 'Enter') {

            } else if (e.code === 'Backspace') {
                if (activeGuess) {
                    const newGuess = activeGuess.slice(0, activeGuess.length-1);
                    setActiveGuess(newGuess);
                }
            } else {
                const key = e.key.toLowerCase();
                if (key.length === 1 && key >= 'a' && key <= 'z') {
                  if (activeGuess.length < WORD_LENGTH) {
                    const newGuess = `${activeGuess}${key}`
                    setActiveGuess(newGuess);
                  }
                }
            }
        };
      window.addEventListener('keydown', onKeyDown);
    
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      }
    }, [activeGuess, setActiveGuess])
    
  const winningList = winningWords.split(/\n/);
  const randIndex = Math.round(Math.random() * winningList.length);
  const answer = winningList[randIndex];
  const guessableSet = new Set(guessableWords.split(/\n/));
  return <Grid activeGuess={activeGuess} answer={answer} guessableSet={guessableSet} />;
};

export default Wordle;
