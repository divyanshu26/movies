import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import MainHeader from './Components/MainHeader';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';

import MovieContext from './store';
import { useState, useEffect } from 'react';

async function getMovieList(){
  console.log('total movie');
  const res = await fetch('https://movies-69e78-default-rtdb.firebaseio.com/movies.json');
  const list = await res.json();
  return list;
};

function App() {
  console.log('app');
  const [list, setList] = useState(null);
  useEffect(()=>{
    
    getMovieList().then(val=>{
      console.log('asdfsadf')
      setList(val)
    });
    
  },[]);
  return (
   <>
    <MovieContext.Provider value={{movie_list:list}}>
    <MainHeader/>
     <main>
      <Switch>
        <Route path ={'/'} exact>
          <Redirect to='./movies'/>
        </Route>
        <Route path={'/trending'}>
          <Trending/>
        </Route>
        <Route path={'/movies'}>
          <Movies/>
        </Route>
      </Switch>
     </main>
    </MovieContext.Provider>
   </>
  );
}

export default App;
