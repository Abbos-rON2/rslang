/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'antd'
import { useEffect, useState } from 'react'

export default function Welcome({mode, words, setWords, page, setWelcome, level, setLevel}){


  const [buttonLoading, setButtonLoading] = useState(false)
  const selectLevels = Array(6).fill('').map( (item,i) => <Button type="primary" key={i} onClick={() => setLevel(i+1)} shape="round" size='small'>{`Level ${i + 1}`}</Button>)

    useEffect(() => { // get words depending on the selected level
    if(level !== null){
      setButtonLoading(true)
      fetch(`https://rs-lang.herokuapp.com/words?group=${level -1}&page=${page}`).then(res => res.json()).then(res => setWords(res))
    }}, [level])
  return(
    <div className="savanna-welcome">
        <h1>Саванна</h1>
        <h3>Мини-игра «Саванна» - это тренировка по переводу пассивного изученного словаря в активную стадию.</h3>
        <div className="savanna-level">
        {mode === 'general'&& !level ? selectLevels : null}
        </div>
        <Button type="primary" onClick={() => {setWelcome(false);}} shape="round" size='large' loading={buttonLoading && !words} disabled={words === null || level === null ? true: false }>Play</Button>
      </div> 
  )
}