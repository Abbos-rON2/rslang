import { useState } from 'react';

const ContentGame = ({ words }) => {
  const [round, setRound] = useState(0);
  const currentWords = words.slice(round, round + 4);
  const compareWord = (clicked, correct) => {
    if (clicked.textContent === correct.word) {
      console.log('Вы ответили правильно');
    } else {
      console.log('Вы ошиблись');
    }
  };
  const randomWord = currentWords[Math.floor(Math.random() * 4)];
  const wordsInRound = currentWords.map(({ word, id }) => (
    <button key={id} onClick={(e) => compareWord(e.target, randomWord)}>
      {word}
    </button>
  ));

  const handlerPlayBtn = () => {};
  console.log(randomWord);
  return (
    <div>
      <button className="play-words" onClick={handlerPlayBtn}>
        PLAY
      </button>
      {wordsInRound}
    </div>
  );
};

export default ContentGame;
