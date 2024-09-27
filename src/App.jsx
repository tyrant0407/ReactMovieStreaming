import './App.css';
import { Route , Routes} from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import Tvshows from './components/Tvshows';
import People from './components/People';
import MovieDetails from './components/MovieDetails';
import PersonDetails from './components/PersonDetails';
import TvDetails from './components/TvDetails';
import Trailer from './components/templates/Trailer';
import Notfound from './components/Notfound';

function App() {

  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/movie' element={<Movie/>}/>
       <Route path='/movie/details/:id' element={<MovieDetails/>}>
       <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>
      </Route>
      <Route path='/tv' element={<Tvshows/>}/>
       <Route path='/tv/details/:id' element={<TvDetails/>}/>
      <Route path='/person' element={<People/>}/>
      <Route path='/person/details/:id' element={<PersonDetails/>}/>
      <Route path='*' element={<Notfound/>}/>
     </Routes>
    </div>
  )
}

export default App
