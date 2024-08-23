import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Cards = ({data}) => {
  return (
    <div>
      {data.map((d,i)=>(
        <Link key={i}>
          <img src={`https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}`} alt={d.title || d.name || d.original_title || d.original_name} />
          <h1 className='text-xl font-bold' >{d.title || d.name || d.original_title || d.original_name}</h1>
        </Link>
      ))  }
    </div>
  )
}

Cards.propTypes = {
  data: PropTypes.array.isRequired,
}
export default Cards
