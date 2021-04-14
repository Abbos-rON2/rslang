import { useEffect } from 'react';
import { useState } from 'react';
import S from './AudioCall.module.css';
import DescriptionGame from './DescriptionGame';
import ContentGame from './ContentGame';

const AudioCall = () => {
  const [isGame, setIsGame] = useState(false);
  const [words, setWords] = useState(null);
  const [level, setLevel] = useState(null);
  const [page, setPage] = useState(0);
  const onClickStartBtn = () => {
    setIsGame((prevIsGame) => !prevIsGame);
  };
  const onSetLevel = (num) => {
    setLevel(num);
  };

  useEffect(() => {
    if (level) {
      fetch(`https://rs-lang.herokuapp.com/words?group=${level - 1}&page=${page}`)
        .then((res) => res.json())
        .then((data) => setWords(words ? [...words, ...data] : data));
    }
  }, [level, page]);

  const isActiveBtn = words ? true : false;

  return (
    <div className={S['audio-call-wrapper']}>
      {!isGame && <DescriptionGame handlerStartBtn={onClickStartBtn} activeBtn={isActiveBtn} level={level} changeLevel={onSetLevel} />}
      {isGame && <ContentGame words={words} />}
    </div>
  );
};

export default AudioCall;
