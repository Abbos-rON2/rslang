import {useEffect} from 'react'

export default function Option({setAnswer, i , wordTranslate}){

  return <div className='savanna-option' onClick={() => setAnswer(i)}> {`${i + 1}. ${wordTranslate}`}</div>
} 