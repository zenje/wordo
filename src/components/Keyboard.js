import React from 'react';

const KeyboardRow = ({ keys, usedLetters }) => {
  return (
    <div className="keyboard-row">
      {keys.map((key) => (
        <button className="keyboard-key">{key}</button>
      ))}
    </div>
  );
};

const Keyboard = ({ usedLetters }) => {
  return (
    <div className="keyboard">
      <KeyboardRow keys={['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']} />
      <KeyboardRow keys={['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']} />
      <KeyboardRow
        keys={['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']}
      />
    </div>
  );
};

export default Keyboard;
