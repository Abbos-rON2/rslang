const CardPostButton = ({callback, text}) => {

    return <button className='unit-card-button' onClick={callback}>{text}</button>
}
export default CardPostButton