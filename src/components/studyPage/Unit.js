import React from "react";
import { useParams } from "react-router-dom";
import UnitCard from "./UnitCard";

export default function Unit() {
  const { number } = useParams();
  const [page, setPage] = React.useState(0);
  const [words, setWords] = React.useState();

  React.useEffect(() => {
    fetch(`https://rs-lang.herokuapp.com/words?group=${number}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setWords(res)
      });
  }, [page]);

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

  const cards = words?.map((item, i) =>  <UnitCard {...item} key={i} /> )

  return (
  <div className="unit-page">
    <div className='unit-cards'>{cards}</div>
    <div className="unit-pagination">{links}</div>
  </div>
  );
}

// import { Route, useParams } from "react-router";
// import { useEffect, useState, Fragment } from "react";
// import { Link, useRouteMatch} from "react-router-dom";
// import { useSelector } from 'react-redux'
// import { Button } from 'antd';

// export default function Unit() {
//   const { path, url } = useRouteMatch();
//   let { number } = useParams();
//   const [page, setPage] = useState(0);
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const user = useSelector(state => state.user);
//   const isAuth = useSelector(state => state.user.message === "Authenticated" ? true : false);

//   const postDifficultWord = async wordId => {
//     const rawResponse = await fetch(`https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify({
//           "difficulty": "difficult",
//           "optional": {}
//       })
//     });
//     const content = await rawResponse;
//     if(content.ok === true){alert('Word was created!')}
//   }

//   const postLearnWord = async wordId => {
//     const rawResponse = await fetch(`https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify({
//           "difficulty": "learn",
//           "optional": {}
//       })
//     });
//     const content = await rawResponse;
//     if(content.ok === true){alert('Word was created!')}
//   }

//   const postDeletedWord = async wordId => {
//     const rawResponse = await fetch(`https://rs-lang.herokuapp.com/users/${user.userId}/words/${wordId}`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify({
//           "difficulty": "deleted",
//           "optional": {}
//       })
//     });
//     const content = await rawResponse;
//     if(content.ok === true){alert('Word was deleted!')}
//   }

//   useEffect(() => {
//     fetch(`https://rs-lang.herokuapp.com/words?group=${number - 1}&page=${page}`)
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//         },

//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, [page]);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <Fragment>
//         <Route path={`${path}/page-:page`}>
//           <ul>
//           {items.map((item) => (
//             <li key={item.id}>
//               <div className="word-card" style={{backgroundImage: 'url(https://rs-lang.herokuapp.com/' + item.image + ')'}}>
//                 <div className="word-card-details">
//                   <h4>{item.word} {item.transcription} - {item.wordTranslate}</h4>
//                   <p>{item.textMeaning} {item.textMeaningTranslate}</p>
//                   <p>{item.textExample} {item.textExampleTranslate}</p>
//                 </div>
//                 <div className="groop-buttons">
//                   <audio controls>
//                     <source src={`https://rs-lang.herokuapp.com/${item.audio}`} type="audio/mp3"></source>
//                   </audio>
//                   {
//                     isAuth &&
//                     <div className="word-actions">
//                       <Button type="primary" onClick={() => postDifficultWord(item.id)}>Difficult</Button>
//                       <Button type="primary" onClick={() => postLearnWord(item.id)}>Learn</Button>
//                       <Button type="primary" onClick={() => postDeletedWord(item.id)}>Delete</Button>
//                     </div>
//                   }
//                 </div>
//               </div>
//             </li>
//           ))}
//           </ul>
//         </Route>
//         <div className="buttons__container">
//           <Link onClick={() => setPage(0)} to={`${url}/page-0`}>{"<<"}</Link>
//           <Link onClick={() => setPage(page > 0 ? page - 1: 0)} to={`${url}/page-${page > 0 ? page - 1: 0}`}>{"<"}</Link>
//           <Link>{page + 1}</Link>
//           <Link onClick={() => setPage(page < 29 ? page + 1: 29)} to={`${url}/page-${page < 29 ? page + 1: 29}`}>{">"}</Link>
//           <Link onClick={() => setPage(29)} to={`${url}/page-29`}>{">>"}</Link>
//         </div>
//       </Fragment>
//     );
//   }
// }
