export default function UnitCard(props){

    return(
        <div className='unit-card'>
            <img src={'/' + props.image} alt="" />
            <div className="unit-card-info">
            {props.word} {props.transcription} 
            <br/> 
            {props.wordTranslate}
            <br/>
            <span dangerouslySetInnerHTML={{__html: props.textExample}}></span>
            <br/>
            {props.textExampleTranslate}
            </div>
        </div>
    )
}