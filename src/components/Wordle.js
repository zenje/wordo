import React from 'react';
import Grid from './Grid';
import guessableWords from '../assets/guessableWords';
import winningWords from '../assets/winningWords';

const Wordle = () => {
  const winningList = winningWords.split(/\n/);
  const randIndex = Math.round(Math.random() * winningList.length);
  const answer = winningList[randIndex];
  const guessableSet = new Set(guessableWords.split(/\n/));
  return <Grid answer={answer} guessableSet={guessableSet} />;
};

export default Wordle;
