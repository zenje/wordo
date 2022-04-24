import { createContext, useContext, useEffect, useState } from 'react';
import guessableWords from '../assets/guessableWords';
import winningWords from '../assets/winningWords';

export const WordleContext = createContext({
  answer: '',
  answerLetters: new Set(),
  guessableSet: new Set(),
  letterStatus: {},
  setLetterStatus: () => {},
});

export const useWordleContext = () => useContext(WordleContext);

const generateAnswer = () => {
  const winningList = winningWords.split(/\n/);
  const randIndex = Math.round(Math.random() * winningList.length);
  const answer = winningList[randIndex];
  return answer;
};

const WordleProvider = ({ children }) => {
  const [answer, setAnswer] = useState('');
  const [answerLetters, setAnswerLetters] = useState(new Set());
  const [letterStatus, setLetterStatus] = useState({});
  const [guessableSet, setGuessableSet] = useState(new Set());

  useEffect(() => {
    const answer = generateAnswer();
    setAnswer(answer);
    setAnswerLetters(new Set(answer.split('')));
    setGuessableSet(new Set(guessableWords.split(/\n/)));
  }, []);

  return (
    <WordleContext.Provider
      value={{
        answer,
        answerLetters,
        guessableSet,
        letterStatus,
        setLetterStatus,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export default WordleProvider;
