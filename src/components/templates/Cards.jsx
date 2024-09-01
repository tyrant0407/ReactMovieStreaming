import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const Cards = ({data,title}) => {
  return (
    <div className='w-full h-full px-[7%] flex flex-col  bg-[#16141d]'>
      {title && <h1 className='text-white text-2xl font-semibold mb-2 ml-5' >{title.toUpperCase().replace("_"," ")}</h1>}
      <div className='w-full h-full flex flex-wrap justify-center'>
      {data && data.map((d,i)=>(
        <Link className='w-[30vh] mr-[2%] mb-[2%] p-[1%] border border-[#333232] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg' key={i}>
          <img className=' h-[40vh] object-cover rounded-lg' src={d.poster_path || d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}` : noimage} alt={d.title || d.name || d.original_title || d.original_name} />
          <h1 className='text-2xl font-semibold text-white mt-2' >{d.title || d.name || d.original_title || d.original_name}</h1>
          <div className='flex items-center gap-2'>
          <i className="text-yellow-500 ri-star-fill"></i> 
          <span className='text-xl font-semibold text-white' >{d.vote_average || "0"}</span>   
          </div>
        </Link>
        
      ))}
      </div>
    </div>
  )
}

Cards.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
}
export default Cards
