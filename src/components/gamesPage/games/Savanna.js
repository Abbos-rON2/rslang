/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from 'react'
import { Button } from 'antd'
import { HeartFilled, HeartOutlined} from '@ant-design/icons'
import useSound from 'use-sound'
import correct from '../../../assets/sound_correct.mp3'
import incorrect from '../../../assets/sound_incorrect.mp3'


export default function Savanna({location}) {

  const [mode, setMode] = useState()
  const [welcome, setWelcome] = useState(true)
  const [level, setLevel] = useState(null)
  const [page, setPage] = useState(0)
  const [words, setWords] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  
  const [round, setRound] = useState(0)
  const [currentWord, setCurrentWord] = useState()
  const [answer, setAnswer] = useState()
  const [options, setOptions] = useState()
  const [optionsList, setOptionsList] = useState()
  const [lifes, setLifes] = useState(Array(5).fill(true))

  const [sound_true] = useSound(correct)
  const [sound_false] = useSound(incorrect)


  useEffect(() => { setMode(location.state.from === 'GamesPage' ? 'general' : 'personal') }, []) //Set game mode

  useEffect(() => { // get words depending on the selected level
    if(level !== null){
      fetch(`https://rs-lang.herokuapp.com/words?group=${level -1}&page=${page}`).then(res => res.json()).then(res => setWords(res))
    }}, [level])

  useEffect(() => { 
    if(words)
      fetch(`https://rs-lang.herokuapp.com/words?group=${level -1}&page=${page}`).then(res => res.json()).then(res => setWords(words.concat(res)))
    }, [page])


  useEffect(() => {
    if(currentWord !== undefined && options[answer] !== undefined && answer !== null ){
      if(currentWord.wordTranslate === options[answer].wordTranslate){
        sound_true()
      }else{
        sound_false()
        subtract()
      }
      setRound(round + 1)
      setAnswer(null)
    }
  }, [answer])

  useEffect(() => {
    if(round){
      startRound()
    }
    if((round + 1) % 5 === 0) {
      setPage(page + 1)
    }
  }, [round])

  const selectLevels = Array(6).fill('').map( (item,i) => <Button type="primary" key={i} onClick={() => setLevel(i+1)} shape="round" size='small'>{`Level ${i + 1}`}</Button>)

  const subtract = () => { // function to manage lifes state 
    const subtractedLifes = Array.from(lifes)
    subtractedLifes.shift();
    subtractedLifes.push(false);
    if(subtractedLifes[0] === false) {
      console.log('gameOver')  ;
      setGameOver(true)
    }else{
      setLifes(subtractedLifes)
    }
  }

 
  const handlePlayButton = () => {
    setWelcome(false);
    startRound();
  }

  const startRound = () => {
    const roundWords = words.slice((round)*4, (round+1)*4);
    const roundWord =  roundWords[Math.floor(Math.random() * 4)]
    const roundOptions = roundWords.map( (item, i) => <div key={i} className='savanna-option' onClick={() => setAnswer(i)}>{`${i + 1}. ${item.wordTranslate}`}</div>);
    setCurrentWord(roundWord);
    setOptions(roundWords)
    setOptionsList(roundOptions);
  }
  
  return( 
    <div className="savanna-wrapper">
      {welcome ?
      <div className="savanna-welcome">
        <h1>Саванна</h1>
        <h3>Мини-игра «Саванна» - это тренировка по переводу пассивного изученного словаря в активную стадию.</h3>
        <div className="savanna-level">
        {mode === 'general'&& !level ? selectLevels : null}
        </div>
        <Button type="primary" onClick={handlePlayButton } shape="round" size='large' disabled={words === null || level === null ? true: false }>Play</Button>
      </div> 
      : 
        gameOver ? <div className="savanna-gameOver">Game Over</div> : 
      <>
        <div className="savanna-header">
          <div className="savanna-settings">Settings</div>
          <div className="savanna-lifes">
            {lifes.map((life,i) => life === true ? <HeartFilled key={i} style={{color: 'white'}}/> : <HeartOutlined key={i} style={{color: 'white'}}/>)}
          </div>
        </div>
        <div className="savanna-body">
          <div className="savanna-word">
            {currentWord.word}
          </div>
          <div className="savanna-options">
            {words ? optionsList: ''}
          </div>
        </div>
      </>
      }
      </div>


  )
}