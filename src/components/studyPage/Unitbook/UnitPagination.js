
const UnitPagination = ({page, setPage}) =>{

    const paginationFunc = (item, i) => {
        let num =  -1;
        if(page === 0){
          if(i === 0) num = 0
          if(i === 1) num = 1
          if(i === 2) num = 29
        }
        if(page > 0 && page < 29){
          if(i === 0) num = 0
          if(page === 1) {
          }else{
            if(i === 1) num = page -1 
          }
          if(i === 2) num = page
          if(page === 28) {
          }else{
            if(i === 3) num = page +1 
          }
          if(i === 4) num = 29
        }
        if(page === 29){
          if(i === 0) num = 0
          if(i === 1) num = 28
          if(i === 2) num = 29
        }
        return num === -1 ? null : <div  className={num === page ? `unit-pag__active`: null} onClick={() => setPage(num)} key={num}>{num+1}</div>
    
      }

    const links = [...Array(5)].map(paginationFunc)

    return <div className="unit-pagination">{links}</div>
}


  export default UnitPagination