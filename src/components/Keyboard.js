import classnames from 'classnames';
import { useEffect } from 'react';
import { ABSENT, CORRECT, KEYBOARD_ROWS, PRESENT } from '../constants';
import { useWordleContext } from './WordleProvider';

const Key = ({ keyValue, onClick, letterStatus }) => {
  const lcKey = keyValue.toLowerCase();
  let classNames = classnames(
    'keyboard-key',
    { correct: letterStatus[lcKey] === CORRECT },
    { present: letterStatus[lcKey] === PRESENT },
    { absent: letterStatus[lcKey] === ABSENT }
  );
  return (
    <button className={classNames} onClick={() => onClick(keyValue)}>
      {keyValue}
    </button>
  );
};

const KeyboardRow = ({ keys, onEnter, onBackspace, onCharInput }) => {
  const onClick = (key) => {
    if (key === 'Enter') {
      onEnter();
    } else if (key === 'Backspace') {
      onBackspace();
    } else {
      onCharInput(key.toLowerCase());
    }
  };

  const { letterStatus } = useWordleContext();
  return (
    <div className="keyboard-row">
      {keys.map((key) => (
        <Key
          key={`key-${key}`}
          keyValue={key}
          letterStatus={letterStatus}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

const Keyboard = (props) => {
  const { onEnter, onBackspace, onCharInput } = props;
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Enter') {
        onEnter();
      } else if (e.code === 'Backspace') {
        onBackspace();
      } else {
        const key = e.key.toLowerCase();
        if (key.length === 1 && key >= 'a' && key <= 'z') {
          onCharInput(key);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onEnter, onBackspace, onCharInput]);

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((keys, i) => (
        <KeyboardRow key={`keyboard-row-${i}`} keys={keys} {...props} />
      ))}
    </div>
  );
};

export default Keyboard;
