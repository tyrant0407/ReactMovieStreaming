import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../utils/Axios";
import noimage from '/noimage.jpg';
import PropTypes from 'prop-types';

const TopNav = ({leftPadding}) => {
    const [query, setquery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const GetSearchResult = async()=>{
        const {data} = await axios.get(`/search/movie?query=${query}`);
        setSearchResult(data.results);
    }
    useEffect(() => {
    GetSearchResult();
    }, [query]);
    
  return (
    <div className="w-[100%] h-[10vh] relative flex items-center pl-[25%]" style={{ paddingLeft: leftPadding }}>
      <i className='ri-search-line text-zinc-200 text-xl mr-5 '></i>
      <input onChange={(e)=> setquery(e.target.value)} value={query} 
      type="text" placeholder='Search Any Movie...' className='w-[50%] h-[5vh] bg-transparent border-none outline-none text-white' />

      {query.length >0 && <i onClick={()=> setquery('')} className='absolute ri-close-line text-zinc-200 text-xl mr-2 right-[19%]'></i>}

      <div className='w-[50%] max-h-[50vh] bg-zinc-200 rounded absolute top-[100%] left-[28%] z-[100] overflow-auto' >
       {searchResult && searchResult.map((s,i)=>(
        <Link key={i} className='inline-flex items-center justify-start p-10 w-[100%] border-b-2 border-zinc-100 text-zinc-600 hover:bg-zinc-300 hover:text-black duration-200'>
       <img className='w-[20%] rounded-md mr-5 object-cover shadow-lg' src={s.backdrop_path || s.poster_path || s.profile_path ? `https://image.tmdb.org/t/p/w500${s.backdrop_path || s.poster_path || s.profile_path}`: noimage } alt="" />
       <span className='text-s font-semibold' >{s.title || s.name || s.original_title || s.original_name}</span>
       </Link>))}

       
      </div>
    </div>
  )
}

TopNav.propTypes = {
    leftPadding: PropTypes.string.isRequired
}

export default TopNav
