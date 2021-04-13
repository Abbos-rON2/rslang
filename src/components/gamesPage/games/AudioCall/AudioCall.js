import { useEffect } from 'react';
import { useState } from 'react';
import S from './AudioCall.module.css';
import DescriptionGame from './DescriptionGame';

const ContantGame = () => {
  return (
    <>
      <button className="play-words">PLAY</button>
      <button>Test 1</button>
      <button>Test 2</button>
      <button>Test 3</button>
      <button>Test 4</button>
      <button>Test 5</button>
    </>
  );
};

const AudioCall = () => {
  const [isGame, setIsGame] = useState(false);
  const [words, setWords] = useState(null);
  const onClickStartBtn = () => {
    setIsGame((prevIsGame) => !prevIsGame);
  };

  useEffect(() => {
    fetch('https://rs-lang.herokuapp.com/words')
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  if (words) {
    console.log(words);
  }

  return (
    <div className={S['audio-call-wrapper']}>
      {!isGame && <DescriptionGame handlerStartBtn={onClickStartBtn} />}
      {isGame && <ContantGame />}
    </div>
  );
};

export default AudioCall;
