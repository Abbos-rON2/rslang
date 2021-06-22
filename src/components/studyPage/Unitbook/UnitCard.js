import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomAudio from "./CustomAudio";
import { useSelector } from 'react-redux'
import CardPostButton from './CardPostButton'
export default function UnitCard(props) {

  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.user.message === "Authenticated" ? true : false);

  const postDifficultWord = async (wordId) => {
    const rawResponse = await fetch(
      `https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          difficulty: "difficult",
          optional: {},
        }),
      }
    );
    const content = await rawResponse;
    if (content.ok === true) {
      alert("Word was created!");
    }
  };

  const postLearnWord = async (wordId) => {
    const rawResponse = await fetch(
      `https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          difficulty: "learn",
          optional: {},
        }),
      }
    );
    const content = await rawResponse;
    if (content.ok === true) {
      alert("Word was created!");
    }
  };

  const postDeletedWord = async (wordId) => {
    const rawResponse = await fetch(
      `https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          difficulty: "deleted",
          optional: {},
        }),
      }
    );
    const content = await rawResponse;
    if (content.ok === true) {
      alert("Word was deleted!");
    }
  };

  return (
    <div className="unit-card">
      <LazyLoadImage src={"/" + props.image} />
      <div className="unit-card-info">
        {props.word} {props.transcription}
        <br />
        {props.wordTranslate}
        <br />
        <span dangerouslySetInnerHTML={{ __html: props.textMeaning }}></span>
        <br />
        {props.textMeaningTranslate}
        <br />
        <span dangerouslySetInnerHTML={{ __html: props.textExample }}></span>
        <br />
        {props.textExampleTranslate}
        <br />
        <CustomAudio url={"/" + props.audio} />
        {isAuth ?  <div>
        <CardPostButton callback={postLearnWord} text='Learn'/>
        <CardPostButton callback={postDifficultWord} text='Difficult'/>
        <CardPostButton callback={postDeletedWord} text='Delete'/>
      </div> : <div>Unauthorized</div>}
      </div>
    </div>
  );
}
