/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
// import { Button } from 'antd'
import { HeartFilled, HeartOutlined} from '@ant-design/icons'
import useSound from 'use-sound'
import correct from '../../../../assets/sound_correct.mp3'
import incorrect from '../../../../assets/sound_incorrect.mp3'
import Welcome from './Welcome'
import Option from './Option'

export default function Savanna({location}) {
  const [sound_true] = useSound(correct)
  const [sound_false] = useSound(incorrect)

  const [animation, setAnimation] = useState(false)
  const [mode, setMode] = useState()
  const [welcome, setWelcome] = useState(true)
  const [level, setLevel] = useState(null)
  const [page, setPage] = useState(0)
  const [words, setWords] = useState(null)
  const [lifes, setLifes] = useState(Array(5).fill(true))
  const [gameOver, setGameOver] = useState(false)

  const [round, setRound] = useState(0)
  const [word, setWord] = useState()
  const [answer, setAnswer] = useState(null)
  const [answerNodes, setAnswerNodes] = useState()
  const [answerWords, setAnswerWords] = useState()


  const handleKey = (e) => {
    const i = e.key -1;
    if(!gameOver){
      if( i===0 || i===1  || i===2 || i===3 ){
        setAnswer(i)
      }
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [gameOver]);
  useEffect(() => { setMode(location.state.from === 'GamesPage' ? 'general' : 'personal')}, []) //Set game mode
  useEffect(() => { if(!welcome)  startRound(); }, [welcome]) // Start game while welcome page disappears

  useEffect(() => {
    if(word !== undefined && answerWords[answer] !== undefined && answer !== null ){
      if(word.wordTranslate === answerWords[answer].wordTranslate){
        sound_true()
      }else{
        sound_false()
        subtract()
      }
        setAnimation(false)
        setRound(round + 1)
        setAnswer(null)
    }
  }, [answer])

  useEffect(() => {
    if(round && !gameOver){
      startRound()
    }
    if((round + 1) % 5 === 0) {
      setPage(page + 1)
    }
  }, [round])

  useEffect(() => { 
    if(words)
      fetch(`https://rs-lang.herokuapp.com/words?group=${level -1}&page=${page}`).then(res => res.json()).then(res => setWords(words.concat(res)))
  }, [page])

  const startRound = () => {
    const roundWords = words.slice((round)*4, (round+1)*4);
    const roundWord =  roundWords[Math.floor(Math.random() * 4)]
    const roundAnswerOptions = roundWords.map( (item, i) => 
    <Option 
      key={i} 
      wordTranslate={item.wordTranslate} 
      i={i}  
      setAnswer={setAnswer}/>
  );
    setWord(roundWord);
    setAnswerWords(roundWords)
    setAnswerNodes(roundAnswerOptions);
    setTimeout(() => {
      setAnimation(true)
    }, 500)
  }

  const timeout = () => {
      console.log('timeout')
      setAnimation(false)
      sound_false()
      subtract()
      setAnswer(null)
      setRound(round + 1)
    }

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


  const lifesNodes = lifes.map((life,i) => life === true ? <HeartFilled key={i} style={{color: 'white'}}/> : <HeartOutlined key={i} style={{color: 'white'}}/>)
  
  return(
    <div className="savanna-wrapper">
       {welcome ? <Welcome 
       mode={mode} 
       setWelcome={setWelcome} 
       words={words} 
       setWords={setWords} 
       page={page}
       level={level}
       setLevel={setLevel} /> : 
        gameOver ? <div className="savanna-gameOver">Game Over</div> : 
      <>
        <div className="savanna-header">
          <div className="savanna-settings">Settings</div>
          <div className="savanna-lifes">
            {lifesNodes}
          </div>
        </div>
        <div className="savanna-body">
        <div 
          className={animation ? 'savanna-word savanna-word_animate' : 'savanna-word'} 
          onAnimationEnd={timeout} 
          >{word ? word.word : '' }</div>
          <div className="savanna-options">
            {words ? answerNodes: ''}
          </div>
        </div>
      </>
      }
      </div>
  )
}