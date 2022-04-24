import React, { useContext, useEffect, useState } from 'react';
import {
  ABSENT,
  CORRECT,
  INVALID_GUESS,
  IN_PROGRESS,
  LOSE,
  PRESENT,
  ROW_COUNT,
  START,
  TITLE,
  WIN,
  WORD_LENGTH
} from '../constants';
import Grid from './Grid';
import Keyboard from './Keyboard';
import { WordleContext } from './WordleProvider';

const Wordle = () => {
  const [activeGuess, setActiveGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState(START);
  const [statusText, setStatusText] = useState('');
  const { answer, answerLetters, guessableSet, letterStatus, setLetterStatus } =
    useContext(WordleContext);

  const onEnter = () => {
    if (gameState === LOSE || gameState === WIN) {
      return;
    }

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

      setGameState(IN_PROGRESS);
      if (activeGuess === answer) {
        setGameState(WIN);
      } else if (guesses.length + 1 === ROW_COUNT) {
        setGameState(LOSE);
      }
    } else {
      setGameState(INVALID_GUESS);
    }
  };

  const onBackspace = () => {
    if (gameState === LOSE || gameState === WIN) {
      return;
    }

    if (activeGuess) {
      const newGuess = activeGuess.slice(0, activeGuess.length - 1);
      setActiveGuess(newGuess);
    }
  };

  const onCharInput = (key) => {
    if (gameState === LOSE || gameState === WIN) {
      return;
    }

    if (activeGuess.length < WORD_LENGTH) {
      const newGuess = `${activeGuess}${key}`;
      setActiveGuess(newGuess);
    }
  };

  useEffect(() => {
    let text = `❀.(*´◡\`*)❀.`;
    if (gameState === WIN) {
      text = `you did it! ٩(ˊᗜˋ*)و`;
    } else if (gameState === LOSE) {
      text = `better luck next time...! (｡•́︿•̀｡)
      the word was <${answer}>
      `;
    } else if (gameState === INVALID_GUESS) {
      text = `not a valid word! \\(*´⌓\`*)/`;
    } else if (gameState === IN_PROGRESS) {
      text = `keep going! ヽ(❁´◡\`❁)ﾉ`;
    }
    setStatusText(text);
  }, [gameState, answer]);

  return (
    <>
      <h1 className="title">{TITLE}</h1>
      <div>{statusText}</div>
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
