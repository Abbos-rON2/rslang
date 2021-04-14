import S from './DescriptionGame.module.css';
import { Button } from 'antd';

const DescriptionGame = ({ handlerStartBtn, activeBtn, changeLevel }) => {
  const selectLevels = Array(6)
    .fill('')
    .map((item, i) => (
      <Button type="primary" key={i} onClick={() => changeLevel(i + 1)} shape="round" size="small">{`Level ${i + 1}`}</Button>
    ));

  return (
    <div className={S['description-game']}>
      <h1 className={S.title}>АУДИОВЫЗОВ</h1>
      <h3 className={S.text}>
        Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода. Вы слышите слово и видите 4 варианта перевода, который
        можно выбрать нажав соответствующую кнопку.
      </h3>
      <div className={S['btn-group']}>{selectLevels}</div>
      <Button type="primary" onClick={handlerStartBtn} shape="round" size="large" disabled={!activeBtn}>
        Play
      </Button>
    </div>
  );
};

export default DescriptionGame;
