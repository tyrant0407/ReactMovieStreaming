import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const Cards = ({data,title,showDetails}) => {
  return (
    <div className='w-full h-full px-[7%] flex flex-col  bg-[#16141d]'>
      <div className='w-full h-full flex flex-wrap justify-center'>
      {data && data.map((d,i)=>(
        <Link to={`/${d.media_type || title}/details/${d.id}`} className='relative w-[30vh] mr-[2%] mb-[2%]  border border-[#333232] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg' key={i}>
          <img className=' h-[40vh] object-cover rounded-lg w-full' src={d.poster_path || d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}` : noimage} alt={d.title || d.name || d.original_title || d.original_name} />
         <div className='pl-2 pb-2'>
         <h1 className='text-2xl font-semibold text-white mt-1  ' >{d.title || d.name || d.original_title || d.original_name}</h1>
          {showDetails && d.vote_average &&  <div className='flex items-center gap-2 p-2'> 
          <span className='absolute top-4 left-3 text-[2.2vh] font-bold text-white h-[5vh] w-[5vh] rounded-full bg-[#eab208dc] flex items-center justify-center' >{Math.round(d.vote_average*10)}%</span>
          </div>}
          {showDetails && d.overview && <p className="text-[#9ca3af] text-sm mt-1">
            {d.overview?.slice(0, 50)}...
          </p>}
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
  showDetails: PropTypes.bool,
}
export default Cards
