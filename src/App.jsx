import './App.css';
import { Route , Routes} from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
function App() {

  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/popular' element={<Popular/>}/>
     </Routes>
    </div>
  )
}

export default App
