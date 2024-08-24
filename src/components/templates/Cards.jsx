import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Cards = ({data,title}) => {
  return (
    <div className='w-full flex flex-wrap'>
      {data && data.map((d,i)=>(
        <Link className='w-[25vh] rounded-lg mr-[5%] mb-[5%] overflow-hidden' key={i}>
          <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}`} alt={d.title || d.name || d.original_title || d.original_name} />
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
