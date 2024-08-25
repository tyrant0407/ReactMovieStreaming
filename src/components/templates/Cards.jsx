import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Cards = ({data,title}) => {
  return (
    <div className='w-full h-full px-[7%] flex flex-wrap justify-center bg-[#16141d]'>
      {data && data.map((d,i)=>(
        <Link className='w-[30vh] mr-[2%] mb-[2%] p-[1%] border border-[#333232] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg' key={i}>
          <img className=' h-[40vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}`} alt={d.title || d.name || d.original_title || d.original_name} />
          <h1 className='text-2xl font-semibold text-white mt-2' >{d.title || d.name || d.original_title || d.original_name}</h1>
        </Link>
      ))}
    </div>
  )
}

Cards.propTypes = {
  data: PropTypes.array.isRequired,
}
export default Cards
