import S from './DescriptionGame.module.css';

const DescriptionGame = ({ handlerStartBtn }) => {
  return (
    <div className={S['description-game']}>
      <h2 className={S.title}>АУДИОВЫЗОВ</h2>
      <p className={S.text}>
        Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода. Вы слышите слово и видите 5 вариантов перевода. Выбрать
        правильный ответ можно двумя способами:
      </p>
      <button className={S['start-btn']} onClick={handlerStartBtn}>
        START
      </button>
    </div>
  );
};

export default DescriptionGame;
