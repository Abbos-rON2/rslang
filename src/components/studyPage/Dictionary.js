import { Route } from "react-router";
import { useEffect, useState, Fragment } from "react";
import { useRouteMatch} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Button, Radio } from 'antd';

export default function Dictionary() {
    const { path, url } = useRouteMatch();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.user);
    const isAuth = useSelector(state => state.user.message === "Authenticated" ? true : false);
    const [cardsData, setCardsData] = useState([]);
    const [difficultWords, setDifficultWords] = useState([]);
    const [learnWords, setLearnWords] = useState([]);
    const [deletedWords, setDeletedWords] = useState([]);

    const resetWord = async wordId => {
        const rawResponse = await fetch(`https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const content = await rawResponse;
        if(content.ok === true){alert('Word was deleted!')}
    }

    useEffect(() => {
        setIsLoaded(false);
        fetch(`https://rs-lang.herokuapp.com/users/${user.userId}/words`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((res) => res.json())
        .then((result) => {
            let difficult = [];
            let learn = [];
            let deleted = [];
            
            result.map((item, index) => {
                console.log(item.difficulty)
                fetch(`https://rs-lang.herokuapp.com/words/${item.wordId}`)
                .then((res) => res.json())
                .then((res) => {
                    if (item.difficulty === "learn"){
                        learn.push(res);
                    } else if (item.difficulty === "difficult"){
                        difficult.push(res);
                    } else {
                        deleted.push(res);
                    }
                    if(result.length === (index + 1)) {
                        setIsLoaded(true);
                        setLearnWords(learn);
                        setDifficultWords(difficult);
                        setDeletedWords(deleted);
                        setCardsData(learn);
                    }});
                
            }, (error) => {
                setError(error);})})
    }, [isAuth]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Fragment>
                <Radio.Group value={cardsData} onChange={(e)=> setCardsData(e.target.value)}>
                    <Radio.Button value={learnWords}>lern</Radio.Button>
                    <Radio.Button value={difficultWords}>Difficult</Radio.Button>
                    <Radio.Button value={deletedWords}>Deleted</Radio.Button>
                </Radio.Group>
                <Route path={`${path}`}>  
                <ul>
                {cardsData.length>0 && cardsData.map((item) => (
                    <li key={item.id}>
                        <div className="word-card" style={{backgroundImage: 'url(https://rs-lang.herokuapp.com/' + item.image + ')'}}>
                            <div className="word-card-details">
                                <h4>{item.word} {item.transcription} - {item.wordTranslate}</h4>
                                <p>{item.textMeaning} {item.textMeaningTranslate}</p>
                                <p>{item.textExample} {item.textExampleTranslate}</p>
                            </div>
                            <div className="groop-buttons">
                                <audio controls>
                                    <source src={`https://rs-lang.herokuapp.com/${item.audio}`} type="audio/mp3"></source>
                                </audio>
                                <div className="word-actions">
                                    <Button type="primary" onClick={() => resetWord(item.id)}>Reset</Button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            </Route>
        </Fragment>); 
    }
}
